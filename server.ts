import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the Google Gen AI client with the server-side API key
// Using lazy-fallback pattern in case GEMINI_API_KEY isn't configured yet
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Real-Time Search Grounded via Gemini 3.5 Flash
  app.post("/api/search", async (req, res) => {
    const { query } = req.body;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required and must be a string." });
    }

    try {
      const ai = getAIClient();
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      // Extract results and grounding metadata
      const text = response.text || "No response generated.";
      
      // Extract grounding metadata safely
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      const groundingChunks = groundingMetadata?.groundingChunks || [];
      const webSearchQueries = groundingMetadata?.webSearchQueries || [];

      // Format sources
      const sources = groundingChunks
        .filter((chunk: any) => chunk.web?.uri)
        .map((chunk: any) => ({
          title: chunk.web.title || "Source",
          url: chunk.web.uri,
        }));

      // Return text and sources to client
      return res.json({
        answer: text,
        sources,
        queries: webSearchQueries,
      });

    } catch (error: any) {
      console.error("Gemini Search Grounding Error:", error);
      return res.status(500).json({
        error: "Failed to fetch real-time search information.",
        details: error.message || error,
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "oxylens-backend" });
  });

  // Vite middleware for development / server static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OxyLens App] Full-Stack server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server startup error:", err);
});
