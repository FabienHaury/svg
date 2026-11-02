import { useMemo } from "react";
import { scaleBand, scaleLinear } from "d3";
import "./BarChart.css";

const WIDTH = 600;
const HEIGHT = 400;

const MARGIN = {
    top: 35,
    right: 25,
    bottom: 65,
    left: 45,
};

export default function BarChart({ data }) {
    const chart = useMemo(() => {
        const sortedData = data;

        const xScale = scaleBand()
            .domain(sortedData.map((d) => d.label))
            .range([MARGIN.left, WIDTH - MARGIN.right])
            .padding(0.25);

        const yScale = scaleLinear()
            .domain([0, Math.max(...sortedData.map((d) => d.value))])
            .nice()
            .range([HEIGHT - MARGIN.bottom, MARGIN.top]);

        return {
            sortedData,
            xScale,
            yScale,
            ticks: yScale.ticks(5),
        };
    }, [data]);

    const baseline = HEIGHT - MARGIN.bottom;

    return (
        <svg
            className="bar-chart"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        >
            {/* Grid lines and Y-axis labels */}
            {chart.ticks.map((tick) => (
                <g key={tick}>
                    <line
                        x1={MARGIN.left}
                        x2={WIDTH - MARGIN.right}
                        y1={chart.yScale(tick)}
                        y2={chart.yScale(tick)}
                        className="bar-grid-line"
                    />

                    <text
                        x={MARGIN.left - 10}
                        y={chart.yScale(tick)}
                        textAnchor="end"
                        dominantBaseline="middle"
                        className="bar-axis-label"
                    >
                        {tick}
                    </text>
                </g>
            ))}

            {/* Bars */}
            {chart.sortedData.map((item) => {
                const x = chart.xScale(item.label);
                const y = chart.yScale(item.value);

                return (
                    <g key={item.label}>
                        <rect
                            x={x}
                            y={y}
                            width={chart.xScale.bandwidth()}
                            height={baseline - y}
                            fill={item.color}
                            rx="3"
                        />

                        <text
                            x={x + chart.xScale.bandwidth() / 2}
                            y={y - 10}
                            textAnchor="middle"
                            className="bar-value-label"
                        >
                            {item.value}
                        </text>

                        <text
                            x={x + chart.xScale.bandwidth() / 2}
                            y={baseline + 22}
                            textAnchor="middle"
                            className="bar-category-label"
                        >
                            {item.label}
                        </text>
                    </g>
                );
            })}

            {/* Baseline */}
            <line
                x1={MARGIN.left}
                x2={WIDTH - MARGIN.right}
                y1={baseline}
                y2={baseline}
                className="bar-axis-line"
            />
        </svg>
    );
}
