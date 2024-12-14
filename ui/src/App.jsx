import React, { useState } from "react";
import { Layout, Modal, Select } from "antd";
import DataSubmission from "./components/DataSubmission";
import GeneTable from "./components/GeneTable";
import axios from "axios";
import D3StripPlot from "./components/D3StripPlot";
import D3BoxPlot from "./components/D3BoxPlot";
import D3ScatterPlotWithBox from "./components/D3ScatterPlotWithBox";

const { Header, Content } = Layout;

const App = () => {
  const [genes, setGenes] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null); // For analysis response
  const [anomalyResult, setAnomalyResult] = useState(null); // For anomaly detection response
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [chartType, setChartType] = useState("BoxPlot"); // Default chart type

  const fetchGenes = async (geneIDs) => {
    try {
      const response = await axios.post("http://x.xyz.com/api/genes", {
        geneIDs,
      });
      const data = response.data.map((gene) => ({
        ...gene,
        expressionValues: JSON.parse(gene.expressionValues),
      }));
      setGenes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const analyzeGene = async (geneID) => {
    try {
      // Fetch analysis data
      const analysisResponse = await axios.get(
        `http://x.xyz.com/api/genes/analysis/${geneID}`
      );
      setAnalysisResult(analysisResponse.data);

      // Fetch anomaly detection data
      const anomalyResponse = await axios.get(
        `http://x.xyz.com/api/genes/anomalies/${geneID}`
      );
      setAnomalyResult(anomalyResponse.data);

      setIsModalVisible(true); // Show the modal with analysis results

      const gene = genes.find((g) => g.geneID === geneID);
      setChartData({ geneID, expressionValues: gene.expressionValues });
    } catch (error) {
      console.error(error);
    }
  };

  // Dynamically render the selected chart type
  const renderChart = () => {
    if (!chartData || !anomalyResult) return null;

    switch (chartType) {
      case "BoxPlot":
        return (
          <D3BoxPlot
            geneID={chartData.geneID}
            expressionValues={chartData.expressionValues}
            outliers={anomalyResult.outliers}
          />
        );
      case "ScatterPlotWithBox":
        return (
          <D3ScatterPlotWithBox
            geneID={chartData.geneID}
            expressionValues={chartData.expressionValues}
            outliers={anomalyResult.outliers}
          />
        );
      case "StripPlot":
        return (
          <D3StripPlot
            geneID={chartData.geneID}
            expressionValues={chartData.expressionValues}
            outliers={anomalyResult.outliers}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "80vh", minWidth: "80vw", marginLeft: "10vw" }}>
      <Header style={{ color: "white", textAlign: "center", fontSize: "24px" }}>
        Omics Data Retrieval and Analysis
      </Header>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <DataSubmission onFetchGenes={fetchGenes} />
        <GeneTable genes={genes} onAnalyze={analyzeGene} />
      </Content>

      {/* Modal for Analysis Results */}
      <Modal
        title="Gene Analysis Result"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        style={{
          minWidth: "650px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Analysis Results */}
          <div
            style={{
              flex: 1,
              paddingRight: "10px",
              borderRight: "1px solid #ccc",
            }}
          >
            <h3>Basic Statistics</h3>
            {analysisResult && (
              <ul>
                <li>
                  <strong>Mean:</strong> {analysisResult.mean}
                </li>
                <li>
                  <strong>Median:</strong> {analysisResult.median}
                </li>
                <li>
                  <strong>Variance:</strong> {analysisResult.variance}
                </li>
              </ul>
            )}
          </div>

          {/* Anomaly Detection Results */}
          <div style={{ flex: 1, paddingLeft: "10px" }}>
            <h3>Anomaly Detection</h3>
            {anomalyResult && (
              <ul>
                <li>
                  <strong>Lower Bound:</strong> {anomalyResult.lowerBound}
                </li>
                <li>
                  <strong>Upper Bound:</strong> {anomalyResult.upperBound}
                </li>
                <li>
                  <strong>Outliers:</strong>{" "}
                  {anomalyResult.outliers.length > 0
                    ? anomalyResult.outliers.join(", ")
                    : "None"}
                </li>
              </ul>
            )}
          </div>
        </div>
        {/* Chart Type Selector */}
        <div style={{ marginTop: "20px", textAlign: "start" }}>
          <Select
            defaultValue="BoxPlot"
            style={{ width: 200 }}
            onChange={(value) => setChartType(value)}
          >
            <Select.Option value="BoxPlot">Box Plot</Select.Option>
            <Select.Option value="ScatterPlotWithBox">
              Scatter Plot with Box
            </Select.Option>
            <Select.Option value="StripPlot">Strip Plot</Select.Option>
          </Select>
        </div>

        {/* Render Chart */}
        <div style={{ width: "80%", maxWidth: "1200px", marginTop: "20px" }}>
          {renderChart()}
        </div>
      </Modal>
    </Layout>
  );
};

export default App;
