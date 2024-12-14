import Joi from "joi";

export const retrieveGenesSchema = Joi.object({
  geneIDs: Joi.array().items(Joi.string().required()).required(),
});

export const analyzeGeneSchema = Joi.object({
  geneID: Joi.string().required(),
});

export const anomalyDetectionSchema = Joi.object({
  geneID: Joi.string().required(),
});
