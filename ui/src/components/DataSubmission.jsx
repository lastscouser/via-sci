import React, { useState } from "react";
import { Input, Button } from "antd";

const { Search } = Input;

const DataSubmission = ({ onFetchGenes }) => {
  const [geneIDs, setGeneIDs] = useState("Sp2,AI837181,Sms,Pfdn2");

  const handleSubmit = () => {
    const ids = geneIDs.split(",").map((id) => id.trim());
    onFetchGenes(ids);
  };

  return (
    <div style={{ marginBottom: "20px", minWidth: "500px" }}>
      <Search
        placeholder="Enter Gene IDs (comma-separated)"
        enterButton="Fetch Data"
        size="large"
        value={geneIDs}
        onChange={(e) => setGeneIDs(e.target.value)}
        onSearch={handleSubmit}
      />
    </div>
  );
};

export default DataSubmission;
