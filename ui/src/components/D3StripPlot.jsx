import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const D3StripPlot = ({ geneID, expressionValues, outliers }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 100;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Clear existing content
    svg.selectAll("*").remove();

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(expressionValues) - 5, d3.max(expressionValues) + 5])
      .range([0, chartWidth]);

    const yScale = d3
      .scaleBand()
      .domain(["Expression"])
      .range([0, chartHeight])
      .padding(0.5);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X-axis
    g.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale));

    // Draw all points
    g.selectAll(".point")
      .data(expressionValues)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d) => xScale(d))
      .attr("cy", yScale("Expression") + yScale.bandwidth() / 2)
      .attr("r", 6)
      .attr("fill", "black")
      .attr("opacity", 0.7);

    // Highlight outliers
    g.selectAll(".outlier")
      .data(outliers)
      .enter()
      .append("circle")
      .attr("class", "outlier")
      .attr("cx", (d) => xScale(d))
      .attr("cy", yScale("Expression") + yScale.bandwidth() / 2)
      .attr("r", 8)
      .attr("fill", "red");
  }, [expressionValues, outliers]);

  return (
    <div>
      <h3>Expression Values for {geneID} (Strip Plot with Outliers)</h3>
      <svg ref={svgRef} width={600} height={100}></svg>
    </div>
  );
};

export default D3StripPlot;
