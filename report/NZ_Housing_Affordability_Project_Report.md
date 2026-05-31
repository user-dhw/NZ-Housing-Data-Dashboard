# Visualising Housing Affordability and Market Inequality in New Zealand

Project Report | COMPX532 / DSIGN532 Information Visualisation  
Project ID Code: BL  
Team members:Hongwei Ding - 1660307; Zhaoxuan Chen - 1656356  
Period: 2015-2025

## 1. Project Overview

This project develops an interactive web-based information visualisation dashboard for exploring housing affordability and market inequality across five New Zealand locations: Auckland, Hamilton, Christchurch, Wellington, and Queenstown / Queenstown-Lakes District. The dashboard covers yearly data from 2015 to 2025 and brings together house value, rent, income, population, and affordability ratio indicators.

The main goal is not only to show housing numbers, but to help users compare places and identify affordability pressure. The dashboard is designed for a course demonstration context, where the audience needs to understand the topic, see the visual design, and quickly gain useful insights from the data.

## 2. Problem and Task Domain

Housing affordability is a major social and economic issue in New Zealand. House values and rents have changed strongly over the last decade, while income growth has not always moved at the same pace. Public housing data is available, but it is usually split across different websites, reports, and spreadsheets. This makes it hard for ordinary users to compare cities, follow long-term changes, or understand which areas are under the most pressure.

The task domain is therefore comparative exploration. A user should be able to ask: Which city has the highest housing cost? Which area has the strongest price-to-income pressure? Did affordability change around the COVID-era housing market period? Are rents and house values moving in the same way across cities?

## 3. Design Considerations

- Support comparison across both place and time, because affordability is not a single-year issue.
- Use coordinated views so that a city selected on the map is also highlighted in charts.
- Keep exact values available through tooltips and labels, while avoiding too many numbers on the screen.
- Use consistent city names and visual encodings across the map, ranking chart, line chart, scatter plot, and heatmap.
- Provide short explanatory captions so the dashboard can be understood during a short presentation demo.

## 4. Implementation and Visualisation Design

The implemented prototype is a React and TypeScript dashboard built with Vite. ECharts is used for the main charts and Leaflet is used for the New Zealand map. The data is loaded from a local JSON file, so the prototype does not require a backend server.

| View                         | Purpose                                                 | Interaction / Insight                                                                                |
| ---------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Regional pressure map        | Shows the five locations geographically.                | Marker colour and size show the selected metric. Clicking a marker selects or deselects that region. |
| Regional rank chart          | Compares cities in the selected year.                   | Selected cities are highlighted so users can compare them with the full set.                         |
| Time series chart            | Shows change from 2015 to the selected end year.        | Multiple selected cities can be compared with the five-location average.                             |
| Income vs price scatter plot | Shows affordability pressure in a two-variable space.   | Bubble size represents population and the dashed line marks an 8x income reference.                  |
| Affordability heatmap        | Shows price-to-income pressure across cities and years. | Colour intensity helps reveal long-term affordability patterns.                                      |
| Insight panel                | Summarises selected-region changes.                     | Automatically updates based on selected cities and year range.                                       |

### Dashboard Screenshot

[Insert final dashboard screenshot here]

Figure 1. Suggested screenshot: dashboard overview showing filters, map, and regional comparison chart.

## 5. Data Sources and Methodology

The project dataset is stored in `src/data/Updated_NZ_Housing_Data_With_Sources.json`. It contains 5 locations, 55 yearly records, and covers 2015 to 2025. The JSON file also contains source metadata, metric definitions, geographic matching notes, calculation notes, and limitations.

Data is important for this project because the visualisation is only convincing if the values are relevant, consistent, and meaningful. A dashboard can look polished, but if the data is weak or unexplained, the audience cannot trust the insights. For this reason, the project focuses on housing indicators that are directly connected to affordability: house value, rent, income, and the house value-to-income ratio.

| Metric               | Source                                                                             | Reason for use                                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `avgPrice`           | Cotality/CoreLogic Home Value Index or Infometrics regional housing statistics     | More suitable than simple average sale price because Home Value Index methods reduce compositional bias and cover major cities and Territorial Authorities. |
| `avgRent`            | MBIE / Tenancy Services Rental Bond Data                                           | Official rental bond records provide a more reliable basis for rent trends than advertised asking rents.                                                    |
| `avgIncome`          | Stats NZ income statistics or Infometrics regional income data                     | Income data is needed to compare housing cost growth with household earning capacity.                                                                       |
| `population`         | Stats NZ subnational population estimates                                          | Population estimates provide contextual information for regional housing pressure.                                                                          |
| `affordabilityRatio` | Calculated metric; cross-check with HUD Change in Housing Affordability Indicators | The ratio provides an intuitive comparison of house values against income. HUD indicators provide official context for affordability changes over time.     |

### Geographic Matching

| Dashboard region | Official Territorial Authority / Area |
| ---------------- | ------------------------------------- |
| Auckland         | Auckland                              |
| Hamilton         | Hamilton City                         |
| Christchurch     | Christchurch City                     |
| Wellington       | Wellington City                       |
| Queenstown       | Queenstown-Lakes District             |

### Calculation Notes

- Affordability ratio is calculated as average house value divided by average annual income.
- A higher affordability ratio means stronger affordability pressure.
- Queenstown is represented by Queenstown-Lakes District to match official Territorial Authority data.
- The same source series and geographic level should be used across years where possible to avoid mixing incompatible data.

### Data Limitations and Transparency

The cleaned values used by the dashboard were summarised from public online references into a local JSON format. This makes the prototype easy to run and demonstrate, but it also means the final interpretation should focus on broad patterns and comparison rather than claiming exact official statistics for every number.

- The dashboard uses a static cleaned JSON file, so the values shown in the prototype should remain consistent with the public source series used during data preparation.
- If any missing yearly values were estimated or rounded during cleaning, the method should be stated clearly in the final presentation.
- Rent data from bond lodgements reflects new or active bond records and may differ from advertised rents.
- Different public sources may use slightly different geographic definitions, so the report documents the Territorial Authority matching used in the dashboard.

For final submission, the report and presentation should be clear that the affordability ratio is a derived indicator calculated from house value and income. If any missing yearly values were estimated or rounded during data cleaning, that should be acknowledged rather than hidden.

## 6. Key Findings Supported by the Dashboard

1. Affordability pressure differs noticeably between the five selected locations.
2. In several locations, house values increased faster than income over the selected period, creating stronger affordability pressure.
3. Rent and house value trends do not always move at the same speed, so rental pressure and ownership pressure should be analysed separately.
4. The COVID-era period is useful to highlight because housing markets changed rapidly around 2020-2022.
5. Queenstown / Queenstown-Lakes District is important to include because it represents a different type of housing market from the larger urban centres.

## 7. Evaluation Against Project Requirements

| Requirement                       | How the project addresses it                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Problem / task domain             | The report explains housing affordability as a comparative visualisation problem.                                  |
| Design process and considerations | The dashboard uses coordinated views, filters, captions, and consistent visual encoding.                           |
| Sufficient data                   | The JSON dataset covers five locations and eleven years, with multiple housing-related metrics.                    |
| Implementation / prototype        | A working React dashboard is provided with map, charts, filters, tooltips, and linked highlighting.                |
| Data sources                      | The report lists data sources and explains source choice, calculation notes, geographic matching, and limitations. |
| Team contributions                | The report identifies separate data/documentation and implementation/design responsibilities.                      |

## 8. Team Contributions

| Team member   | Main contribution                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Hongwei Ding  | Frontend implementation, dashboard layout, ECharts visualisations, Leaflet map, interaction design, interface polish, and demo preparation. |
| Zhaoxuan Chen | Data source checking, metric design, affordability interpretation, project background, documentation, and presentation preparation.         |

## 9. Conclusion

The project provides a working interactive visualisation prototype for exploring housing affordability and market inequality in New Zealand from 2015 to 2025. It uses multiple coordinated views to support comparison across cities, years, and affordability metrics. The most important value of the dashboard is that it turns a scattered set of housing-related indicators into a single exploratory workspace.

The project satisfies the main course requirement of demonstrating an information visualisation design with relevant data and a clear implementation. The main remaining caution is data transparency: the final presentation should explain where the data came from, how the affordability ratio was calculated, and what limitations exist.

## 10. References

- MBIE / Tenancy Services. Rental Bond Data. https://www.tenancy.govt.nz/about-tenancy-services/data-and-statistics/rental-bond-data/
- MBIE / Tenancy Services. Market Rent. https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/
- Ministry of Housing and Urban Development. Change in Housing Affordability Indicators. https://www.hud.govt.nz/stats-and-insights/change-in-housing-affordability-indicators/indices
- Cotality / CoreLogic NZ. Home Value Index and Indices. https://www.cotality.com/nz/our-data/indices
- Infometrics. Regional Economic Profile and Housing Statistics. https://rep.infometrics.co.nz/
- Stats NZ. Regional income and population statistics. https://www.stats.govt.nz/
