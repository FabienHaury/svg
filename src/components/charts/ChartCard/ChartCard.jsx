import "./ChartCard.css";

export default function ChartCard({ title, description, children }) {
    return (
        <article className="chart-card">
            <header className="chart-card-header">
                <h2>{title}</h2>
                <p>{description}</p>
            </header>

            <div className="chart-card-content">
                {children}
            </div>
        </article>
    );
}
