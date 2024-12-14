import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const D3BoxPlot = ({ geneID, expressionValues, outliers }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

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
      .domain(["Expression"])
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
      .call(d3.axisBottom(xScale));

    // Draw box
    g.append("rect")
      .attr("x", xScale("Expression"))
      .attr("y", yScale(Q3))
      .attr("height", yScale(Q1) - yScale(Q3))
      .attr("width", xScale.bandwidth())
      .attr("fill", "steelblue")
      .attr("opacity", 0.7);

    // Draw median line
    g.append("line")
      .attr("x1", xScale("Expression"))
      .attr("x2", xScale("Expression") + xScale.bandwidth())
      .attr("y1", yScale(d3.median(values)))
      .attr("y2", yScale(d3.median(values)))
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Draw whiskers
    g.append("line")
      .attr("x1", xScale("Expression") + xScale.bandwidth() / 2)
      .attr("x2", xScale("Expression") + xScale.bandwidth() / 2)
      .attr("y1", yScale(min))
      .attr("y2", yScale(Q1))
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    g.append("line")
      .attr("x1", xScale("Expression") + xScale.bandwidth() / 2)
      .attr("x2", xScale("Expression") + xScale.bandwidth() / 2)
      .attr("y1", yScale(max))
      .attr("y2", yScale(Q3))
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Draw all expression values as points
    g.selectAll(".value")
      .data(expressionValues)
      .enter()
      .append("circle")
      .attr("class", "value")
      .attr("cx", xScale("Expression") + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d))
      .attr("r", 3)
      .attr("fill", "black")
      .attr("opacity", 0.7);

    // Draw outliers
    g.selectAll(".outlier")
      .data(outliers)
      .enter()
      .append("circle")
      .attr("class", "outlier")
      .attr("cx", xScale("Expression") + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d))
      .attr("r", 4)
      .attr("fill", "red");
  }, [expressionValues, outliers]);

  return (
    <div>
      <h3>Expression Values for {geneID} (Box Plot with Outliers)</h3>
      <svg ref={svgRef} width={500} height={300}></svg>
    </div>
  );
};

export default D3BoxPlot;
