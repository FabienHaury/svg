import { useMemo, useState } from "react";
import { pie, arc } from "d3";
import "./EnhancedDonutChart.css";

const SIZE = 440;
const RADIUS = 145;
const INNER_RADIUS = 75;
const LABEL_RADIUS = 178;

export default function EnhancedDonutChart({ data }) {
    const [hovered, setHovered] = useState(null);

    const { slices, total } = useMemo(() => {
        const pieLayout = pie()
            .value((d) => d.value)
            .sort(null);

        const sliceArc = arc()
            .innerRadius(INNER_RADIUS)
            .outerRadius(RADIUS);

        const labelArc = arc()
            .innerRadius(LABEL_RADIUS)
            .outerRadius(LABEL_RADIUS);

        return {
            total: data.reduce((sum, item) => sum + item.value, 0),

            slices: pieLayout(data).map((slice) => ({
                ...slice,
                path: sliceArc(slice),
                labelPosition: labelArc.centroid(slice),
            })),
        };
    }, [data]);

    const activeSlice = slices.find(
        (slice) => slice.data.label === hovered
    );

    const percentage = activeSlice
        ? `${((activeSlice.data.value / total) * 100).toFixed(0)}%`
        : null;

    return (
        <svg
            className="enhanced-donut-chart"
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
                        className={`enhanced-donut-slice ${hovered === slice.data.label ? "is-hovered" : ""
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

                <>
                    <text
                        className="donut-percentage"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        y="-5"
                    >
                        {percentage || "100%"}
                    </text>

                    <text
                        className="donut-category"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        y="19"
                    >
                        {activeSlice ? activeSlice.data.label : "TOTAL"}
                    </text>
                </>
            </g>
        </svg>
    );
}
