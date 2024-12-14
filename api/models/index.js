import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");

const Gene = sequelize.define("Gene", {
  geneID: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  transcript: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expressionValues: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { sequelize, Gene };
