import { Hono } from "hono";
import { clientEntry } from "./routes/client-entry";

const app = new Hono();

// Basic health check endpoint
app.get("/api/health", (c) => {
  return c.json({ status: "ok" });
});

// Game-specific endpoints can be added here
// Example: Leaderboard, saved games, multiplayer rooms, etc.

// Serve the client app
app.get("/*", clientEntry);

export default app;