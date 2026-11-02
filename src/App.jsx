
import { useState } from "react";

import { chartData } from "./data/chartData";

import PieChart from "./components/charts/PieChart/PieChart";
import DonutChart from "./components/charts/DonutChart/DonutChart";
import ExplodedPieChart from "./components/charts/ExplodedPieChart/ExplodedPieChart";

import EnhancedPieChart from "./components/charts/EnhancedPieChart/EnhancedPieChart";
import EnhancedDonutChart from "./components/charts/EnhancedDonutChart/EnhancedDonutChart";
import EnhancedExplodedPieChart from "./components/charts/EnhancedExplodedPieChart/EnhancedExplodedPieChart";

import BarChart from "./components/charts/BarChart/BarChart";
import DataTable from "./components/charts/DataTable/DataTable";
import Treemap from "./components/charts/Treemap/Treemap";

import ChartCard from "./components/charts/ChartCard/ChartCard";

import "./App.css";

export default function App() {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <span className="eyebrow">DATA VISUALIZATION LAB</span>
        <h1>The Pie Chart Experiment</h1>
        <p>
          Same data. Different visualizations. Different ways of telling the story.
          <br />
          Let's see how they compare.
        </p>
        <p>
          At first glance, they might all tell the same story.
          But look a little closer: some make the data easier to understand,
          while others make us work surprisingly hard.
        </p>
        <h3>
          Let's put them to the test!
        </h3>
      </header>

      {/* CLASSIC CHARTS */}
      <section className="chart-section">
        <h2>Classic pie charts</h2>
        <p className="section-description">
          Three traditional ways of visualizing the same data using pie charts.
        </p>

        <div className="chart-grid">
          <ChartCard
            title="Classic Pie Chart"
            description="The traditional approach."
          >
            <PieChart data={chartData} />
          </ChartCard>

          <ChartCard
            title="Donut Chart"
            description="A pie chart with a hole."
          >
            <DonutChart data={chartData} />
          </ChartCard>

          <ChartCard
            title="Exploded Pie Chart"
            description="Individual slices separated."
          >
            <ExplodedPieChart data={chartData} />
          </ChartCard>
        </div>
      </section>

      {/* Text for the first section */}
      <section className="experiment-text">
        <h2>Can you actually read these charts?</h2>

        <p>
          Take a good look at the three visualizations.
          Can you tell which category is the <strong>biggest</strong>?
          Which is the <strong>smallest</strong>? Are any of them <strong>equal</strong>?
        </p>

        <p>
          So, can you? With confidence? Not so easy, is it?
        </p>

        <p>
          That's one of the biggest problems with pie charts: they force us to estimate angles and compare areas.
          Our eyes aren't particularly good at doing either accurately.
          Without labels or percentages, we're essentially guessing.
          And when we're guessing, even small differences can be difficult to spot.
        </p>

        <p>
          More importantly, this makes it surprisingly easy to create visualizations that look convincing but
          don't accurately communicate the underlying data.
          A slight change in proportions can completely change the impression a chart gives us.
        </p>

        <h3>Something is wrong with these graphs. Can you guess what?</h3>

        <button
          className="reveal-button"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? "Hide the answer" : "Reveal the answer"}
        </button>

        {showAnswer && (
          <div className="spoiler-answer">
            <h3>The numbers don't add up!</h3>

            <p>
              A pie chart represents a whole.
              Every slice is part of that whole, which means all the values must add up to exactly 100%.
            </p>

            <p>
              But our original dataset adds up to <strong>102%</strong>!
            </p>

            <p>
              So how can these charts still look perfectly normal?
            </p>

            <p>
              D3 automatically normalizes the values when calculating the angles of the slices.
              In other words, it adjusts their proportions to fit into a complete circle.
            </p>

            <p>
              The result? A perfectly round pie chart hiding an imperfect dataset.
              The visualization looks fine, but the underlying numbers tell a different story.
              And that's an important lesson: a chart can look correct without the data behind it being correct.
              Without labels or percentages, we might never notice the discrepancy.
            </p>

            <p>
              A pie chart without labels or percentages can be about as informative as an empty plate after
              someone's eaten the pie!
            </p>

            <strong>
              Never trust a visualization without questioning its data!
            </strong>
          </div>
        )}
      </section>

      {/* ENHANCED CHARTS */}
      <section className="chart-section">
        <h2>Enhanced pie charts</h2>
        <p className="section-description">
          Corrected data, same charts, but this time we're giving our eyes a little help.
          <br />
          By adding percentages, labels, and interactive elements,
          let's see whether we can make these visualizations easier to understand.
        </p>

        <div className="chart-grid">
          <ChartCard
            title="Enhanced Pie Chart"
            description="Hover over a slice to see its percentage."
          >
            <EnhancedPieChart data={chartData} />
          </ChartCard>

          <ChartCard
            title="Enhanced Donut Chart"
            description="Hover to display the percentage in the center."
          >
            <EnhancedDonutChart data={chartData} />
          </ChartCard>

          <ChartCard
            title="Enhanced Exploded Pie Chart"
            description="A marker inside every slice."
          >
            <EnhancedExplodedPieChart data={chartData} />
          </ChartCard>
        </div>
      </section>


      {/* Text after enhanced charts */}
      <section className="experiment-text">
        <h2>Better, but are they good?</h2>

        <p>
          Well, that certainly helps!
        </p>

        <p>
          We no longer have to rely entirely on visual estimation.
          We can see the percentages, identify individual categories,
          and get a much clearer idea of what the data represents.
        </p>

        <p>
          But there's something worth noticing.
          <br />
          We've added labels, hover effects, markers,
          and extra visual elements just to make a relatively simple chart easier to read.
          And even with all these improvements,
          comparing two categories still means looking back and forth between slices.
        </p>

        <p>
          The donut chart gives us a convenient space to display additional information in its center.
          The exploded pie chart makes individual values more visible.
          Sure, these features make the charts more interactive and demonstrate what's possible with D3.
          But do they actually make the data easier to understand?
        </p>

        <p>
          These are useful additions, but they don't fundamentally change how we compare the data.
          We're still comparing angles and areas rather than positions along a common scale.
          But here's the question:
        </p>

        <h3>
          So, did we really improve the pie chart, or did we just
          find ways to compensate for its weaknesses?
        </h3>

        <p>
          Perhaps the problem isn't the lack of information.
          Perhaps it's the visualization itself.
          Let's try something different.
        </p>
      </section>


      {/* Alternatives */}
      <section className="chart-section">
        <h2>Alternatives</h2>
        <p className="section-description">
          Same dataset. Completely different ways of looking at the information.
          <br />
          What happens when we stop trying to fit everything into a circle?
        </p>

        <div className="chart-grid">
          <ChartCard
            title="Vertical Bar Chart"
            description="Compare categories using a common baseline."
          >
            <BarChart data={chartData} />
          </ChartCard>

          <ChartCard
            title="Simple Data Table"
            description="Exact values. No visual estimation."
          >
            <DataTable data={chartData} />
          </ChartCard>

          <ChartCard
            title="Treemap"
            description="Categories represented by proportional areas."
          >
            <Treemap data={chartData} />
          </ChartCard>
        </div>
      </section>


      {/* Text after alternatives */}
      <section className="experiment-text">
        <h2>Now that's more like it!</h2>

        <p>
          Notice the difference? Much easier, isn't it? (Maybe not when the charts aren't properly scaled 😜)
        </p>

        <p>
          With a <strong>bar chart</strong>, comparing categories becomes much easier.
          Every bar starts from the same baseline,
          so our eyes can quickly identify the largest and smallest values.
          Instead of estimating angles or comparing areas, we're simply comparing lengths.
          And that makes a huge difference.
        </p>

        <p>
          What about the <strong>data table</strong>?
          Sometimes, the best visualization is no visualization at all.
          When precision matters, a table gives us exactly what we need: the original values, clearly presented and easy to compare.
          No guessing. No estimating. Just the numbers.
        </p>

        <p>
          The <strong>treemap</strong> offers another interesting perspective.
          By representing categories as proportional rectangles,
          it gives us an immediate sense of how much space each category occupies relative to the others.
          It's visually appealing and useful for exploring part-to-whole relationships,
          particularly when working with hierarchical data.
        </p>

        <p>
          There's another advantage worth mentioning: bar charts and tables can easily be sorted.
          Want to find the largest category? Sort by <strong>value</strong>.
          Looking for a particular category? Sort <strong>alphabetically</strong>.
          Sorting options aren't included in these examples 😄
        </p>

        <p>Simple, intuitive, and effective.</p>

        <h3>
          So, do we really need a pie chart?
        </h3>

        <p>
          Well, yes. Sometimes!
        </p>

        <p>
          Pie charts aren't inherently bad. When we want to show how a small number of categories contribute to a meaningful whole,
          they can provide a quick and familiar overview.
          But when the goal is to compare individual values, identify small differences, or rank categories,
          other visualizations are often much more effective.
        </p>

        <p>
          The real lesson isn't that pie charts are evil.
          It's that the <strong>best visualization isn't necessarily the most attractive one.
            It's the one that communicates the data most clearly.</strong>
        </p>

        <p>
          Every chart has its strengths and weaknesses.
          Understanding those differences helps us choose the right tool for the job.
          And sometimes, the simplest solution really is the best one.
        </p>

        <p>
          Because ultimately, data visualization isn't about making numbers look pretty.
          It's about <strong>making information understandable</strong>.
        </p>
      </section>

      <footer className="site-footer">
        <span>
          Fabien Haury 2026 for{" "}
          <a
            href="https://www.react-graph-gallery.com/react-d3-dataviz-course"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-d3-dataviz-course
          </a>
        </span>
      </footer>

    </main>
  );
}
