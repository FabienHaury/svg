
# 🥧 The Pie Chart Experiment

**Same data. Different charts. One important question: are pie charts really worth it?**

🌐 **[Visit the live website](https://fabienhaury.github.io/svg/)**

## 🎯 About the Project

Are pie charts really the best way to visualize data?

This project explores the strengths and weaknesses of pie charts by comparing different variations of pie charts with alternative data visualizations.

The goal isn't simply to criticize pie charts, but to demonstrate how the choice of visualization can influence how easily people understand and interpret data.

## 📊 The Experiment

Using the exact same dataset, we compare several ways of representing information.

### 1. Classic Pie Charts

Three traditional variations:

- **Classic Pie Chart** – the standard representation of proportions.
- **Donut Chart** – a pie chart with a hollow center.
- **Exploded Pie Chart** – slices separated to emphasize individual categories.

### 2. Enhanced Pie Charts

Can we improve the readability of pie charts by adding extra information?

- **Enhanced Pie Chart** – hover over a slice to reveal its percentage.
- **Enhanced Donut Chart** – displays the selected percentage in the center, with a default total of 100%.
- **Enhanced Exploded Pie Chart** – displays percentages directly inside each slice.

### 3. Alternatives

Finally, we compare pie charts with other visualization methods:

- **Vertical Bar Chart** – makes comparing category values easier using a common baseline.
- **Data Table** – displays exact values without requiring visual estimation.
- **Treemap** – represents categories using rectangles proportional to their values.

## 🛠️ Technologies

The project is built using:

- **React** – component-based user interface.
- **Vite** – development environment and build tooling.
- **D3.js** – mathematical calculations for chart layouts, scales and positioning.
- **CSS** – styling and visual presentation.

D3.js is used exclusively for calculations. All chart elements are rendered using React JSX.

No D3 DOM manipulation (`d3.select`, `d3.append`, etc.) is used.


## 📈 Datasets

The experiment intentionally uses two different datasets to demonstrate an additional problem with data visualization: a chart can look perfectly valid even when the underlying data is incorrect.

### Original Pie Charts — Incorrect Dataset

The three original pie charts use the following values:

| Category | Value |
|:--|--:|
| Technology | 35 |
| Sales | 16 |
| Operations | 9 |
| Marketing | 33 |
| Other | 9 |
| **Total** | **102** |

A pie chart represents a whole, so its values should add up to 100%.

However, this dataset totals **102%**. D3.js still renders a complete circle by normalizing the values, hiding the inconsistency.

### Enhanced Charts & Alternatives — Corrected Dataset

The enhanced pie charts, bar chart, table and treemap use a corrected dataset:

| Category | Value |
|:--|--:|
| Technology | 32 |
| Sales | 16 |
| Operations | 10 |
| Marketing | 33 |
| Other | 9 |
| **Total** | **100** |

This allows us to compare the different visualization techniques using mathematically consistent data.

The two datasets are intentionally kept separate to preserve the original experiment.


## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL where you can explore the experiment.

### Production Build

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```text
src/
├── components/
│   └── charts/
│       ├── PieChart/
│       ├── DonutChart/
│       ├── ExplodedPieChart/
│       ├── EnhancedPieChart/
│       ├── EnhancedDonutChart/
│       ├── EnhancedExplodedPieChart/
│       ├── BarChart/
│       ├── DataTable/
│       └── Treemap/
│
├── data/
│   └── chartData.js
│
├── App.jsx
├── App.css
└── main.jsx
```

Each visualization is maintained as an independent component, making it easier to modify, extend and compare individual chart implementations.

## 💡 What Does This Experiment Demonstrate?

Pie charts aren't inherently useless. They can be useful for showing how a whole is divided.

However, comparing angles and areas is difficult for humans, particularly when categories have similar values.

Bar charts offer a shared baseline, making comparisons easier. Tables provide exact values, while treemaps offer another way to explore proportions.

The important lesson is that **the best visualization depends on the information we want to communicate.**

Sometimes, a simpler visualization does a much better job.

## 🌐 Live Demo

Try the experiment yourself:

**https://fabienhaury.github.io/svg/**

## 📜 License

This project is open-source. Feel free to explore, learn from and adapt the code according to the repository's chosen license.
