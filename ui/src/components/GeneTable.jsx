import React from "react";
import { Table, Button } from "antd";

const GeneTable = ({ genes, onAnalyze }) => {
  const columns = [
    {
      title: "Gene ID",
      dataIndex: "geneID",
      key: "geneID",
    },
    {
      title: "Expression Values",
      dataIndex: "expressionValues",
      key: "expressionValues",
      render: (values) => values.join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => onAnalyze(record.geneID)}>
          Analyze
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={genes}
      columns={columns}
      rowKey="geneID"
      style={{ marginBottom: "20px", minWidth: "500px" }}
    />
  );
};

export default GeneTable;
