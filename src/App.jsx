
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
          Same data. Different visualizations.
          Let's see how they compare.
        </p>
      </header>

      {/* CLASSIC CHARTS */}
      <section className="chart-section">
        <h2>Classic pie charts</h2>
        <p className="section-description">
          Three traditional ways of displaying the same data.
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
          You can see the different parts of these three charts.
          But can you tell which category is the biggest?
          Which is the smallest? Are any of them equal?
        </p>

        <p>
          Probably not with much confidence!
          Pie charts lack a clear scale, and humans are notoriously
          bad at estimating angles and comparing areas.
          Without percentages or exact values, we're left guessing.
        </p>

        <p>
          And that makes misleading visualizations surprisingly easy.
          Change the proportions just a little, and the story can
          suddenly look very different.
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
              A pie chart represents a whole. Therefore, all its
              slices must add up to 100%.
            </p>

            <p>
              But our original dataset adds up to <strong>102%</strong>!
            </p>

            <p>
              D3 automatically normalizes the values to draw a
              complete circle. The chart looks perfectly valid,
              but hides the inconsistency in the original data.
            </p>

            <p>
              A pie chart without labels or percentages is about as useful
              as an empty plate after you've eaten the pie!
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
          Same charts, with a little extra information. Shown differently.
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
          We can now see the percentages without having to guess.
          Comparing categories is easier, and we have more information
          than before.
        </p>

        <p>
          But let's be honest: we're adding labels, hover effects and
          extra visual elements just to make a pie chart easier to read.
        </p>

        <p>
          And even then, comparing two percentages still requires
          looking back and forth between slices.
        </p>

        <p>
          The donut chart gives us a convenient place to display
          information, and the exploded chart puts the numbers right
          in front of us. But neither changes the fundamental problem:
          we're still comparing slices of a circle.
        </p>

        <h3>
          So, did we really improve the pie chart, or did we just
          find ways to compensate for its weaknesses?
        </h3>

        <p>
          Maybe it's time to ask ourselves whether a pie chart is
          the right tool for the job in the first place...
        </p>
      </section>


      {/* Alternatives */}
      <section className="chart-section">
        <h2>Alternatives</h2>
        <p className="section-description">
          Same data, different representations!
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
          Much easier, isn't it?
        </p>

        <p>
          With a bar chart, comparing categories becomes almost effortless.
          All bars share the same baseline, so we can quickly identify
          the biggest and smallest values without estimating angles
          or comparing areas.
        </p>

        <p>
          And what about the table? No guessing, no estimating.
          The exact values are right there, easy to read and compare.
        </p>

        <p>
          Even the treemap offers a different perspective by showing
          how much space each category occupies relative to the others.
          Although comparing areas isn't always as precise as comparing
          lengths or reading exact numbers.
        </p>

        <p>
          Another nice advantage? Bar charts and tables can easily be
          sorted by value or alphabetically. Want to find the biggest
          category? Put it at the top! Want to find something specific?
          Sort by name!
        </p>

        <h3>
          So, do we really need a pie chart?
        </h3>

        <p>
          Of course, pie charts aren't completely useless. They can
          provide a quick overview of how a whole is divided.
          But when it comes to comparing categories, other
          visualizations often do the job much better.
        </p>

        <p>
          The lesson isn't that pie charts are evil.
          It's that choosing the right way to present data matters.
          Sometimes, the simplest chart is the best chart.
        </p>
      </section>


    </main>
  );
}
