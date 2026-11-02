
import { useMemo } from "react";
import { pie, arc } from "d3";
import "./EnhancedExplodedPieChart.css";

const SIZE = 440;
const RADIUS = 135;
const LABEL_RADIUS = 155;
const EXPLOSION_DISTANCE = 12;

export default function EnhancedExplodedPieChart({ data }) {
    const slices = useMemo(() => {
        const total = data.reduce((sum, item) => sum + item.value, 0);

        const pieLayout = pie()
            .value((d) => d.value)
            .sort(null);

        const sliceArc = arc()
            .innerRadius(0)
            .outerRadius(RADIUS);

        const labelArc = arc()
            .innerRadius(LABEL_RADIUS)
            .outerRadius(LABEL_RADIUS);

        return pieLayout(data).map((slice) => {
            const [cx, cy] = sliceArc.centroid(slice);
            const [labelX, labelY] = labelArc.centroid(slice);

            const length = Math.hypot(cx, cy);

            const offsetX =
                length === 0 ? 0 : (cx / length) * EXPLOSION_DISTANCE;

            const offsetY =
                length === 0 ? 0 : (cy / length) * EXPLOSION_DISTANCE;

            return {
                ...slice,
                path: sliceArc(slice),
                offsetX,
                offsetY,
                percentage: `${((slice.data.value / total) * 100).toFixed(0)}%`,
                percentagePosition: [
                    cx + offsetX,
                    cy + offsetY,
                ],
                labelPosition: [
                    labelX + offsetX,
                    labelY + offsetY,
                ],
            };
        });
    }, [data]);

    return (
        <svg
            className="enhanced-exploded-pie-chart"
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
                        transform={`translate(${slice.offsetX}, ${slice.offsetY})`}
                    />
                ))}

                {slices.map((slice) => (
                    <text
                        key={slice.data.label}
                        x={slice.percentagePosition[0]}
                        y={slice.percentagePosition[1]}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="slice-percentage"
                    >
                        {slice.percentage}
                    </text>
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
            </g>
        </svg>
    );
}
