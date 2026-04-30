# NZ Housing Affordability Dashboard

## Project Overview

This project visualises housing affordability and market inequality across five New Zealand cities from 2015 to 2025.

## Selected Cities

- Auckland
- Hamilton
- Christchurch
- Wellington
- Queenstown / Queenstown-Lakes District

## Metrics

- Average house price or house value
- Median weekly rent
- Average income
- Affordability ratio

## Visualisations

- Interactive map
- Time series chart
- Regional comparison chart
- Affordability scatter plot
- Affordability heatmap

## Technologies

- React
- TypeScript
- ECharts
- Leaflet
- TailwindCSS

## Primary dataset file

The app reads **`src/data/Updated_NZ_Housing_Data_With_Sources.json`** (typed entry point: `src/data/dataset.ts`). That file holds regions, yearly metrics (including optional `affordabilityRatio`), structured **dataSources** with links, **methodology** notes, and **metadata** used for titles and the project overview footnote.

## Data Sources

- MBIE / Tenancy Services Rental Bond Data
- HUD Change in Housing Affordability Indicators
- Cotality / CoreLogic Home Value Index
- Stats NZ regional income and population statistics

## Team Members

- Hongwei Ding
- Zhaoxuan Chen

## How to Run

Prerequisites: [Node.js](https://nodejs.org/) (recommended: current LTS).

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The app runs on port **3000** by default (see `package.json`). Open the URL shown in the terminal (for example `http://localhost:3000`).

3. Production build:

   ```bash
   npm run build
   ```

4. Preview the production build locally:

   ```bash
   npm run preview
   ```
