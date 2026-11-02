import { useMemo } from "react";
import { hierarchy, treemap, treemapSquarify } from "d3";
import "./Treemap.css";

const WIDTH = 600;
const HEIGHT = 400;

export default function Treemap({ data }) {
    const rectangles = useMemo(() => {
        const root = hierarchy({ children: data })
            .sum((d) => d.value)
            .sort((a, b) => {
                return (
                    b.value - a.value ||
                    a.data.label.localeCompare(b.data.label)
                );
            });

        treemap()
            .size([WIDTH, HEIGHT])
            .tile(treemapSquarify)
            .paddingInner(5)
            .paddingOuter(2)(root);

        return root.leaves();
    }, [data]);

    return (
        <svg
            className="treemap-chart"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        >
            {rectangles.map((node) => {
                const width = node.x1 - node.x0;
                const height = node.y1 - node.y0;

                const centerX = node.x0 + width / 2;
                const centerY = node.y0 + height / 2;

                return (
                    <g key={node.data.label}>
                        <rect
                            x={node.x0}
                            y={node.y0}
                            width={width}
                            height={height}
                            fill={node.data.color}
                            rx="3"
                        />

                        <text
                            x={centerX}
                            y={centerY - 7}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="treemap-category-label"
                        >
                            {node.data.label}
                        </text>

                        <text
                            x={centerX}
                            y={centerY + 13}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="treemap-value-label"
                        >
                            {node.value}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
