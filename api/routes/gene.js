import express from "express";
import {
  retrieveGenes,
  analyzeGene,
  detectAnomalies,
} from "../business/gene-service.js";
import {
  retrieveGenesSchema,
  analyzeGeneSchema,
  anomalyDetectionSchema,
} from "../validation/gene.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/", validate(retrieveGenesSchema), async (req, res) => {
  const { geneIDs } = req.body;
  const genes = await retrieveGenes(geneIDs);
  res.json(genes);
});

router.get(
  "/analysis/:geneID",
  validate(analyzeGeneSchema),
  async (req, res) => {
    const { geneID } = req.params;
    const analysis = await analyzeGene(geneID);
    res.json(analysis);
  }
);

router.get(
  "/anomalies/:geneID",
  validate(anomalyDetectionSchema),
  async (req, res) => {
    const { geneID } = req.params;
    const anomalies = await detectAnomalies(geneID);
    res.json(anomalies);
  }
);

export default router;
