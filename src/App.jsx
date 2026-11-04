import { useState } from "react";

import { chartData } from "./data/chartData";
import { chartDataWrong } from "./data/chartDataWrong";

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
          Same data. Different visualizations. Different ways of
          telling the story.
          <br />
          Let's see how they compare.
        </p>

        <p>
          Pie charts are familiar, simple, and everywhere. But they're
          also one of the most debated forms of data visualization.
          Comparing angles and areas isn't particularly easy, and
          spotting small differences can quickly become a guessing game.
        </p>

        <p>
          So, are pie charts really as useful as we think?
          Or are there better ways to tell the same story?
        </p>

        <h3>Let's put them to the test!</h3>
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
            <PieChart data={chartDataWrong} />
          </ChartCard>

          <ChartCard
            title="Donut Chart"
            description="A pie chart with a hole."
          >
            <DonutChart data={chartDataWrong} />
          </ChartCard>

          <ChartCard
            title="Exploded Pie Chart"
            description="Individual slices separated."
          >
            <ExplodedPieChart data={chartDataWrong} />
          </ChartCard>
        </div>
      </section>

      {/* Text for the first section */}
      <section className="experiment-text">
        <h2>Can you actually read these charts?</h2>

        <p>
          Take a good look at these three visualizations.
          Can you identify the <strong>largest</strong> category?
          The <strong>smallest</strong>?
          Can you tell whether any categories have exactly the same value?
        </p>

        <p>
          And more importantly, how confident are you in your answers?
        </p>

        <p>
          That's one of the main limitations of pie charts.
          To compare categories, we have to estimate angles and
          areas. Unfortunately, our eyes aren't particularly good
          at making precise comparisons this way.
        </p>

        <p>
          Without labels or percentages, we're essentially guessing.
          Small differences become difficult to spot, and categories
          with similar values can be almost impossible to distinguish.
        </p>

        <p>
          There's another problem worth investigating:
          a visualization can look perfectly convincing while
          hiding something wrong with the underlying data.
        </p>

        <h3>Something is wrong with these graphs. Can you spot it?</h3>

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
              A pie chart represents a whole. Every slice is a
              proportion of that whole, which means the values
              should add up to exactly 100%.
            </p>

            <p>
              But our original dataset adds up to <strong>102%</strong>!
            </p>

            <p>Here is the original dataset:</p>

            <table className="answer-data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Value</th>
                </tr>
              </thead>

              <tbody>
                {chartDataWrong.map((item) => (
                  <tr key={item.label}>
                    <td>
                      <span
                        className="category-label"
                        style={{ color: item.color }}
                      >
                        <span
                          className="category-dot"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.label}
                      </span>
                    </td>
                    <td>{item.value}%</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <th>Total</th>
                  <th>
                    {chartDataWrong.reduce((sum, item) => sum + item.value, 0)}%
                  </th>
                </tr>
              </tfoot>
            </table>

            <p>
              So why does the pie chart still look perfectly normal?
            </p>

            <p>
              D3 calculates each slice's angle relative to the sum of all the supplied values.
              It automatically distributes the slices across a complete circle,
              regardless of whether the input values actually add up to 100%.
            </p>

            <p>
              In our case, the chart silently adjusts the proportions to fit a full 360° circle.
              <br />
              The result? A perfectly round pie chart hiding an inconsistent dataset.
            </p>

            <p>
              The chart looks perfectly fine, but the underlying
              dataset is inconsistent.
            </p>

            <p>
              And that's an important lesson: a <strong>visualization can
                look correct without the data behind it being correct</strong>.
              A beautiful chart doesn't automatically mean reliable
              information.
            </p>

            <p>
              A pie chart without labels or percentages can be about
              as informative as an empty plate after someone's eaten
              the pie!
            </p>

            <strong>
              Always question the data before trusting the visualization!
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
          Percentages make the values clearer, labels help identify
          categories, and interactive elements give us additional
          information on demand.
        </p>

        <p>
          But take a closer look. We've added labels, hover effects,
          markers, and extra visual elements just to make a relatively
          simple chart easier to interpret.
        </p>

        <p>
          And even with all these improvements, comparing two
          categories still means looking back and forth between slices.
        </p>

        <p>
          The donut chart gives us a convenient space to display
          additional information in its center. The exploded pie
          chart makes individual slices more visually distinct.
          These are interesting design choices, but do they
          fundamentally improve our ability to compare values?
        </p>

        <p>
          Not really. We're still comparing angles and areas rather
          than positions along a common scale.
        </p>

        <h3>
          Did we actually improve the pie chart, or did we just
          find ways to compensate for its weaknesses?
        </h3>

        <p>
          Perhaps the problem isn't the lack of information.
          Perhaps it's the visualization itself.
        </p>

        <p>
          Let's try something different.
        </p>
      </section>


      {/* Alternatives */}
      <section className="chart-section">
        <h2>Alternatives</h2>
        <p className="section-description">
          Same data. Different visualizations.
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
          Notice the difference? Much easier, isn't it?
          (Well, assuming the charts are properly scaled 😜)
        </p>

        <p>
          With a <strong>bar chart</strong>, comparing categories
          becomes much easier. Every bar starts from a common
          baseline, allowing our eyes to quickly identify the
          largest and smallest values.
        </p>

        <p>
          Instead of estimating angles or comparing areas,
          we're simply comparing lengths along a shared scale.
          This is something our eyes are much better at doing.
        </p>

        <p>
          What about the <strong>data table</strong>?
          Sometimes, the best visualization is no visualization
          at all. When precision matters, a table gives us the
          original values directly. No guessing, no estimating,
          just the numbers.
        </p>

        <p>
          The <strong>treemap</strong> offers another perspective.
          It represents categories using proportional rectangles,
          making it easy to explore part-to-whole relationships.
          It's particularly useful when working with hierarchical
          data, where categories contain smaller subcategories.
        </p>

        <p>
          However, there's an important distinction:
          comparing rectangular areas isn't necessarily as
          accurate as comparing bar lengths. The treemap is
          excellent for exploring proportions, but it isn't
          always the best choice for precise comparisons.
        </p>

        <p>
          There's another advantage worth mentioning:
          bar charts and tables can easily be sorted.
        </p>

        <p>
          Want to find the largest category? Sort by
          <strong> value</strong>.
          Looking for a particular category? Sort
          <strong> alphabetically</strong>.
          Sorting isn't included in these examples, though 😄
        </p>

        <p>
          Simple, intuitive, and effective.
        </p>

        <h3>So, do we really need a pie chart?</h3>

        <p>
          Well, yes. Sometimes!
        </p>

        <p>
          Pie charts aren't inherently bad. When showing how a
          small number of categories contribute to a meaningful
          whole, they can provide a quick and familiar overview.
        </p>

        <p>
          But when the goal is to compare individual values,
          identify small differences, or rank categories,
          other visualizations are often much more effective.
        </p>

        <p>
          The real lesson isn't that pie charts are evil.
          It's that the <strong>best visualization isn't
            necessarily the most attractive one. It's the one
            that communicates the data most clearly.</strong>
        </p>

        <p>
          Every chart has its strengths and weaknesses.
          Understanding those differences helps us choose
          the right tool for the job.
        </p>

        <p>
          Because ultimately, data visualization isn't about
          making numbers look pretty.
          It's about <strong>making information understandable.</strong>
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

    </main >
  );
}
