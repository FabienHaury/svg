import { useMemo } from "react";
import { pie, arc } from "d3";
import "./DonutChart.css";

const SIZE = 440;
const RADIUS = 145;
const INNER_RADIUS = 75;
const LABEL_RADIUS = 150;

export default function DonutChart({ data }) {
    const slices = useMemo(() => {
        const pieLayout = pie()
            .value((d) => d.value)
            .sort(null);

        const sliceArc = arc()
            .innerRadius(INNER_RADIUS)
            .outerRadius(RADIUS);

        const labelArc = arc()
            .innerRadius(LABEL_RADIUS)
            .outerRadius(LABEL_RADIUS);

        return pieLayout(data).map((slice) => ({
            ...slice,
            path: sliceArc(slice),
            labelPosition: labelArc.centroid(slice),
        }));
    }, [data]);

    return (
        <svg
            className="donut-chart"
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
