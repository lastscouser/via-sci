import { sequelize, Gene } from "../models/index.js";
import fs from "fs";
import csv from "csv-parser";

export const syncDatabaseAndSeed = async () => {
  await sequelize.sync({ force: true });

  // Seed Data from Uploaded File
  const genes = [];
  fs.createReadStream("./data/simple_demo.tsv")
    .pipe(csv({ separator: "\t" }))
    .on("data", (row) => {
      const expressionValues = [
        parseFloat(row.exper_rep1),
        parseFloat(row.exper_rep2),
        parseFloat(row.exper_rep3),
        parseFloat(row.control_rep1),
        parseFloat(row.control_rep2),
        parseFloat(row.control_rep3),
      ];
      genes.push({
        geneID: row.gene,
        transcript: row.transcript,
        expressionValues: JSON.stringify(expressionValues),
      });
    })
    .on("end", async () => {
      await Gene.bulkCreate(genes);
      console.log("Database seeded successfully.");
    });
};
