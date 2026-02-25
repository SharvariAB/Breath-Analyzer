#  Breath-Analyzer

### Hyper-Local Real-Time Air Quality Monitoring & Predictive Alert System

Breath-Analyzer is an AI-powered environmental intelligence platform that provides **real-time AQI monitoring and short-term pollution forecasting** for Indian cities.

The system integrates live air pollution APIs with machine learning models to deliver city-specific environmental insights and predictive alerts.

---

##  Problem Statement

Air pollution remains one of the most serious public health threats in urban India.

Current systems:

* Provide only static or delayed data
* Lack predictive forecasting
* Do not offer interactive analytics
* Provide limited actionable insights

Breath-Analyzer addresses these gaps using real-time API integration and AI-driven prediction.

---

##  Key Features

*  Real-time AQI data via OpenWeather Air Pollution API
*  Dynamic city selection with automatic geocoding
*  Interactive dashboard with pollutant breakdown:

  * PM2.5
  * PM10
  * NO₂
  * SO₂
  * CO
*  30-day AQI trend visualization
*  Machine Learning-based next-day AQI prediction
*  Intelligent pollution risk alerts
*  Downloadable pollution reports (CSV export)
*  Real-time data refresh (auto-updating)

---

##  Machine Learning Approach

* Synthetic historical dataset generation (prototype stage)
* Feature engineering using rolling averages
* Random Forest Regressor for AQI prediction
* Linear Regression baseline comparison
* Hybrid approach: Injecting real-time AQI into prediction pipeline
* Evaluation metrics: RMSE & R² score

---

##  System Architecture

### 1️ Data Layer

* OpenWeather Geocoding API (City → Coordinates)
* OpenWeather Air Pollution API (Live AQI & pollutants)

### 2️ Processing Layer

* Data transformation
* PM2.5 → Estimated AQI conversion
* Hybrid dataset preparation

### 3️ Prediction Layer

* Random Forest regression model
* Next-day AQI forecasting

### 4️ Frontend Dashboard

* City selection
* AQI gauge
* Trend charts
* Pollutant metrics
* Prediction panel
* Alert system

---

##  Tech Stack

**Frontend**

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn-ui

**Data Source**

* OpenWeather API

**Machine Learning**

* Random Forest (Scikit-learn prototype)
* Custom predictive logic for frontend demo

---

##  How to Run Locally

### 1️ Clone the Repository

```bash
git clone https://github.com/your-username/breath-analyzer.git
cd breath-analyzer
```

### 2️ Install Dependencies

```bash
npm install
```

### 3️ Add Environment Variable

Create a `.env` file in the root directory:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 4️ Start Development Server

```bash
npm run dev
```

---

##  Example Use Case

A user selects a city (e.g., Pune).
The system:

* Fetches real-time pollution data
* Displays current AQI & pollutant levels
* Shows 30-day trend analysis
* Predicts next-day AQI
* Generates downloadable report

---

##  Future Enhancements

* Integration with real IoT sensor devices
* State-level pollution heatmap
* LSTM-based time-series forecasting
* Mobile app version
* SMS/Email-based pollution alerts

---

##  Project Purpose

This project is developed as a prototype for AI-driven environmental monitoring, combining real-time data integration and predictive analytics into an interactive web dashboard.


