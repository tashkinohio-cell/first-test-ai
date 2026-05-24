import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const PORT = 3000;
const WATCHLIST_PATH = path.join(process.cwd(), "watchlist.json");

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment secrets. Please configure it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for getting and setting the synced watchlist across devices
  app.get("/api/anime/list", (req, res) => {
    try {
      if (fs.existsSync(WATCHLIST_PATH)) {
        const data = fs.readFileSync(WATCHLIST_PATH, "utf-8");
        return res.json(JSON.parse(data));
      } else {
        return res.json({ initialized: false, list: [] });
      }
    } catch (err: any) {
      console.error("Error reading watchlist from file:", err);
      res.status(500).json({ error: "Failed to read watchlist from server" });
    }
  });

  app.post("/api/anime/list", (req, res) => {
    try {
      const { list } = req.body;
      if (!Array.isArray(list)) {
        return res.status(400).json({ error: "Invalid dynamic watchlist format" });
      }
      fs.writeFileSync(WATCHLIST_PATH, JSON.stringify(list, null, 2), "utf-8");
      res.json({ success: true });
    } catch (err: any) {
      console.error("Error writing watchlist to file:", err);
      res.status(500).json({ error: "Failed to save watchlist to server" });
    }
  });

  // API endpoint for AI anime info correction and retrieval
  app.post("/api/anime/expand", async (req, res) => {
    const { query } = req.body;
    if (!query || typeof query !== "string" || query.trim() === "") {
      return res.status(400).json({ error: "Anime query is required" });
    }

    try {
      const ai = getGeminiClient();
      
      const prompt = `Convert, correct typos, and expand the anime search query: "${query}".
Identify this anime (even if it's abbreviated like "COTE", "SAO", "AOT", etc.). Provide its full formal title (original / English / Romaji combinations where appropriate).
Retrieve its official seasons, and for each season, compile the full episode list with episode numbers and accurate titles (or logical titles). For example, "Classroom of the Elite" has four seasons, listing episodes 1-12 or 1-13 for each. Provide high-quality synopsis (2 sentences), main tags/genres, rating, and studio info if available.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              expandedTitle: { 
                type: Type.STRING, 
                description: "Full official clean title with alternate popular names in parenthesis if helpful (e.g., 'Classroom of the Elite (Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e)')" 
              },
              synopsis: { 
                type: Type.STRING, 
                description: "A compact 2-sentence synopsis focusing on the core plot and style." 
              },
              genres: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of major genre tags, e.g. Drama, Thriller, Suspense." 
              },
              studio: { 
                type: Type.STRING, 
                description: "Animation production studio (e.g. Lerche, ufotable, Wit Studio)." 
              },
              rating: { 
                type: Type.STRING, 
                description: "Aggregate fan rating or age rating classification (e.g. 8.1/10 stars or PG-13)." 
              },
              seasons: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    seasonNumber: { 
                      type: Type.INTEGER, 
                      description: "Dynamic sequential index starting at 1" 
                    },
                    episodes: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          episodeNumber: { type: Type.INTEGER },
                          title: { 
                            type: Type.STRING, 
                            description: "Official episode name or common descriptive name" 
                          }
                        },
                        required: ["episodeNumber", "title"]
                      }
                    }
                  },
                  required: ["seasonNumber", "episodes"]
                }
              }
            },
            required: ["expandedTitle", "synopsis", "genres", "seasons"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from Gemini.");
      }

      const parsedData = JSON.parse(responseText);
      res.json(parsedData);
    } catch (error: any) {
      console.error("Gemini expansion error:", error);
      res.status(500).json({ 
        error: error.message || "Failed to expand anime details using AI", 
        suggestedTitle: query // Return original as a fallback
      });
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in development mode with Vite HMR disabled.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in production static serving mode.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Anime To-Do Tracker server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server launch failure:", err);
});
