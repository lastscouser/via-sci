import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const D3ScatterPlotWithBox = ({ geneID, expressionValues, outliers }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    // Clear existing content
    svg.selectAll("*").remove();

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Sort values for calculations
    const values = expressionValues.sort((a, b) => a - b);
    const Q1 = d3.quantile(values, 0.25);
    const Q3 = d3.quantile(values, 0.75);
    const IQR = Q3 - Q1;
    const min = Math.max(Q1 - 1.5 * IQR, d3.min(values));
    const max = Math.min(Q3 + 1.5 * IQR, d3.max(values));

    const xScale = d3
      .scaleBand()
      .domain(expressionValues.map((_, i) => `Sample ${i + 1}`))
      .range([0, chartWidth])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(values) - 5, d3.max(values) + 5])
      .nice()
      .range([chartHeight, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add Y-axis
    g.append("g").call(d3.axisLeft(yScale));

    // Add X-axis
    g.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Draw box
    g.append("rect")
      .attr("x", xScale("Sample 1") - xScale.bandwidth() / 2)
      .attr("y", yScale(Q3))
      .attr("height", yScale(Q1) - yScale(Q3))
      .attr("width", chartWidth - xScale.bandwidth())
      .attr("fill", "lightblue")
      .attr("opacity", 0.5);

    // Draw median line
    g.append("line")
      .attr("x1", xScale("Sample 1") - xScale.bandwidth() / 2)
      .attr("x2", chartWidth - xScale.bandwidth() / 2)
      .attr("y1", yScale(d3.median(values)))
      .attr("y2", yScale(d3.median(values)))
      .attr("stroke", "blue")
      .attr("stroke-width", 2);

    // Draw whiskers
    g.append("line")
      .attr("x1", xScale("Sample 1") + chartWidth / 2)
      .attr("x2", xScale("Sample 1") + chartWidth / 2)
      .attr("y1", yScale(min))
      .attr("y2", yScale(max))
      .attr("stroke", "blue")
      .attr("stroke-width", 2);

    // Draw scatter points
    g.selectAll(".point")
      .data(expressionValues)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (_, i) => xScale(`Sample ${i + 1}`) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d))
      .attr("r", 4)
      .attr("fill", "black");

    // Map outliers to their original indices
    const outlierIndices = expressionValues
      .map((value, index) => (outliers.includes(value) ? index : null))
      .filter((index) => index !== null);

    // Draw outliers at the correct indices
    g.selectAll(".outlier")
      .data(outlierIndices)
      .enter()
      .append("circle")
      .attr("class", "outlier")
      .attr("cx", (d) => xScale(`Sample ${d + 1}`) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(expressionValues[d]))
      .attr("r", 6)
      .attr("fill", "red");
  }, [expressionValues, outliers]);

  return (
    <div>
      <h3>
        Expression Values for {geneID} (Scatter Plot with Box-and-Whisker Guide)
      </h3>
      <svg ref={svgRef} width={500} height={300}></svg>
    </div>
  );
};

export default D3ScatterPlotWithBox;
