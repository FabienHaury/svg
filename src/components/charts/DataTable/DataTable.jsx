import "./DataTable.css";

export default function DataTable({ data }) {
    return (
        <div className="data-table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Value</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.label}>
                            <td>
                                <span
                                    className="table-category"
                                    style={{ color: item.color }}
                                >
                                    {item.label}
                                </span>
                            </td>

                            <td className="table-value">
                                {item.value}
                            </td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td className="table-value">
                            {data.reduce((sum, item) => sum + item.value, 0)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
