import { useMemo } from "react";
import { pie, arc } from "d3";
import "./PieChart.css";

const SIZE = 440;
const RADIUS = 145;
const LABEL_RADIUS = 150;

export default function PieChart({ data }) {
    const { slices, labels } = useMemo(() => {
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
            slices: result.map((slice) => ({
                ...slice,
                path: sliceArc(slice),
            })),

            labels: result.map((slice) => ({
                label: slice.data.label,
                position: labelArc.centroid(slice),
            })),
        };
    }, [data]);

    return (
        <svg
            className="pie-chart"
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
                    />
                ))}

                {labels.map(({ label, position }) => (
                    <text
                        key={label}
                        x={position[0]}
                        y={position[1]}
                        textAnchor={position[0] > 0 ? "start" : "end"}
                        dominantBaseline="middle"
                        className="chart-label"
                    >
                        {label}
                    </text>
                ))}
            </g>
        </svg>
    );
}
