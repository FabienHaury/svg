import { useMemo, useState } from "react";
import { pie, arc } from "d3";
import "./EnhancedPieChart.css";

const SIZE = 440;
const RADIUS = 145;
const LABEL_RADIUS = 178;

export default function EnhancedPieChart({ data }) {
    const [hovered, setHovered] = useState(null);

    const { slices, total } = useMemo(() => {
        const pieLayout = pie()
            .value((d) => d.value)
            .sort(null);

        const sliceArc = arc()
            .innerRadius(0)
            .outerRadius(RADIUS);

        const labelArc = arc()
            .innerRadius(LABEL_RADIUS)
            .outerRadius(LABEL_RADIUS);

        const result = pieLayout(data);

        return {
            total: data.reduce((sum, item) => sum + item.value, 0),
            slices: result.map((slice) => ({
                ...slice,
                path: sliceArc(slice),
                labelPosition: labelArc.centroid(slice),
                tooltipPosition: sliceArc.centroid(slice),
            })),
        };
    }, [data]);

    return (
        <svg
            className="enhanced-pie-chart"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
            <g transform={`translate(${SIZE / 2}, ${SIZE / 2})`}>
                {slices.map((slice) => (
                    <path
                        key={slice.data.label}
                        d={slice.path}
                        fill={slice.data.color}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className={`enhanced-pie-slice ${hovered === slice.data.label ? "is-hovered" : ""
                            }`}
                        onMouseEnter={() => setHovered(slice.data.label)}
                        onMouseLeave={() => setHovered(null)}
                    />
                ))}

                {slices.map((slice) => (
                    <text
                        key={slice.data.label}
                        x={slice.labelPosition[0]}
                        y={slice.labelPosition[1]}
                        textAnchor={slice.labelPosition[0] > 0 ? "start" : "end"}
                        dominantBaseline="middle"
                        className="chart-label"
                    >
                        {slice.data.label}
                    </text>
                ))}

                {slices
                    .filter((slice) => hovered === slice.data.label)
                    .map((slice) => {
                        const percentage = (
                            (slice.data.value / total) * 100
                        ).toFixed(0);

                        const [x, y] = slice.tooltipPosition;

                        return (
                            <g
                                key={slice.data.label}
                                className="pie-percentage-tooltip"
                                transform={`translate(${x}, ${y})`}
                                pointerEvents="none"
                            >
                                <rect
                                    x="-29"
                                    y="-15"
                                    width="58"
                                    height="30"
                                    rx="7"
                                />

                                <text
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    {percentage}%
                                </text>
                            </g>
                        );
                    })}
            </g>
        </svg>
    );
}
