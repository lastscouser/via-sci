import express from "express";
import cors from "cors";
import geneRoutes from "./routes/gene.js";
import { syncDatabaseAndSeed } from "./startup/db-sync.js";
import { errorHandler } from "./middleware/error.js";

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/genes", geneRoutes);
app.use(errorHandler);

// Sync Database and Start Server
(async () => {
  await syncDatabaseAndSeed();
  app.listen(PORT, () =>
    console.log(`Backend running on http://localhost:${PORT}`)
  );
})();
