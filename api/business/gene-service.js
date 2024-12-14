import { Gene } from "../models/index.js";

export const retrieveGenes = async (geneIDs) => {
  const genes = await Gene.findAll({ where: { geneID: geneIDs } });
  if (!genes.length) throw new Error("No genes found.");
  return genes;
};

export const analyzeGene = async (geneID) => {
  const gene = await Gene.findByPk(geneID);
  if (!gene) throw new Error("Gene not found.");

  const values = JSON.parse(gene.expressionValues);
  const mean = (values.reduce((a, b) => a + b) / values.length).toFixed(2);
  const median = values
    .sort((a, b) => a - b)
    [Math.floor(values.length / 2)].toFixed(2);
  const variance = (
    values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length
  ).toFixed(2);

  return {
    mean: parseFloat(mean),
    median: parseFloat(median),
    variance: parseFloat(variance),
  };
};

export const detectAnomalies = async (geneID) => {
  const gene = await Gene.findByPk(geneID);
  if (!gene) throw new Error("Gene not found.");

  const values = JSON.parse(gene.expressionValues);

  // Sort the values
  const sortedValues = [...values].sort((a, b) => a - b);

  // Calculate Q1, Q3, and IQR
  const Q1 = sortedValues[Math.floor(sortedValues.length * 0.25)];
  const Q3 = sortedValues[Math.floor(sortedValues.length * 0.75)];
  const IQR = Q3 - Q1;

  // Determine lower and upper bounds
  const lowerBound = Q1 - 1.5 * IQR;
  const upperBound = Q3 + 1.5 * IQR;

  // Identify outliers
  const outliers = values.filter(
    (value) => value < lowerBound || value > upperBound
  );

  return {
    lowerBound,
    upperBound,
    outliers,
    originalValues: values,
  };
};
