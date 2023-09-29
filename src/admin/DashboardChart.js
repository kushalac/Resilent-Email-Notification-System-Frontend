import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DashboardChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data) return;

    // Define your chart dimensions and margins
    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Remove any existing SVG elements in the chartRef
    d3.select(chartRef.current).selectAll("svg").remove();

    // Create an SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales for X and Y axes
    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.2); // Reduce padding to make bars narrower

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height, 0]);

    // Create an array of alternating colors
    const colors = ["steelblue", "orange"];

    // Draw X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(5)); // Add ticks to the X axis

    // Draw Y axis
    svg.append("g").call(d3.axisLeft(yScale).ticks(5)); // Add ticks to the Y axis

    // Create a group for data bars
    const bars = svg.append("g").selectAll("rect").data(data).enter();

    // Create data bars with alternating colors and black text
    bars
      .append("rect")
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", (d, i) => colors[i % colors.length]) // Alternate colors for bars

    // Add labels (numbers) to the bars in black
    bars
      .append("text")
      .text((d) => d.value)
      .attr("x", (d) => xScale(d.label) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "black");

  }, [data]);

  return <div ref={chartRef}></div>;
};

export default DashboardChart;
