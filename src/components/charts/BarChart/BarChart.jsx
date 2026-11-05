
import { useMemo } from "react";
import { scaleBand, scaleLinear } from "d3";
import "./BarChart.css";

const WIDTH = 600;
const HEIGHT = 400;

const MARGIN = {
    top: 25,
    right: 45,
    bottom: 35,
    left: 100,
};

export default function BarChart({ data }) {
    const chart = useMemo(() => {
        const sortedData = data;

        const xScale = scaleLinear()
            .domain([0, Math.max(...sortedData.map((d) => d.value))])
            .nice()
            .range([MARGIN.left, WIDTH - MARGIN.right]);

        const yScale = scaleBand()
            .domain(sortedData.map((d) => d.label))
            .range([MARGIN.top, HEIGHT - MARGIN.bottom])
            .padding(0.25);

        return {
            sortedData,
            xScale,
            yScale,
            ticks: xScale.ticks(5),
        };
    }, [data]);

    const baseline = MARGIN.left;

    return (
        <svg
            className="bar-chart"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        >
            {/* Grid lines and X-axis labels */}
            {chart.ticks.map((tick) => (
                <g key={tick}>
                    <line
                        x1={chart.xScale(tick)}
                        x2={chart.xScale(tick)}
                        y1={MARGIN.top}
                        y2={HEIGHT - MARGIN.bottom}
                        className="bar-grid-line"
                    />

                    <text
                        x={chart.xScale(tick)}
                        y={HEIGHT - MARGIN.bottom + 20}
                        textAnchor="middle"
                        className="bar-axis-label"
                    >
                        {tick}
                    </text>
                </g>
            ))}

            {/* Horizontal bars */}
            {chart.sortedData.map((item) => {
                const x = baseline;
                const y = chart.yScale(item.label);
                const width = chart.xScale(item.value) - baseline;

                return (
                    <g key={item.label}>
                        <rect
                            x={x}
                            y={y}
                            width={width}
                            height={chart.yScale.bandwidth()}
                            fill={item.color}
                            rx="3"
                        />

                        {/* Value label */}
                        <text
                            x={chart.xScale(item.value) + 8}
                            y={y + chart.yScale.bandwidth() / 2}
                            dominantBaseline="middle"
                            className="bar-value-label"
                        >
                            {item.value}
                        </text>

                        {/* Category label */}
                        <text
                            x={MARGIN.left - 10}
                            y={y + chart.yScale.bandwidth() / 2}
                            textAnchor="end"
                            dominantBaseline="middle"
                            className="bar-category-label"
                        >
                            {item.label}
                        </text>
                    </g>
                );
            })}

            {/* Baseline */}
            <line
                x1={baseline}
                x2={WIDTH - MARGIN.right}
                y1={HEIGHT - MARGIN.bottom}
                y2={HEIGHT - MARGIN.bottom}
                className="bar-axis-line"
            />
        </svg>
    );
}
