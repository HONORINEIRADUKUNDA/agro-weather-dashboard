# Agro-Processing & Solar Weather Dashboard

## Overview
A data-driven web application designed to track meteorological conditions for regional agricultural hubs. This dashboard pulls real-time environmental telemetry (temperature, wind speed, and direct solar irradiance) to help monitor conditions relevant to crop management and solar drying systems.

## Features
* **Parallel Data Fetching:** Utilizes `Promise.all` to simultaneously retrieve current conditions for multiple regional hubs.
* **Interactive Filtering:** Instant search functionality to filter stations using array methods.
* **Deep-Dive Analytics:** Clickable station cards that transition the view to a detailed hourly breakdown of temperature, humidity, and solar metrics.
* **State Management:** Fully integrated loading, error, and empty search states.

## Tech Stack
* Vanilla JavaScript (ES6 Modules)
* HTML5 / CSS3
* API: [Open-Meteo](https://open-meteo.com/) (No authentication required)

## How to Run Locally
1. Clone this repository.
2. Open the project folder in VS Code.
3. Start a local server (e.g., using the "Live Server" extension) to run the ES6 modules.
4. Navigate to `index.html`.
