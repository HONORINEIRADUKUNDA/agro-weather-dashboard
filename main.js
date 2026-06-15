import { fetchDashboardData, fetchStationDetails } from './api.js';
import { renderDashboardGrid, renderDetailedProfile, toggleStateElement } from './render.js';

// Application State Management Memory
let masterStationData = [];

async function loadApplicationSystem() {
    // Reset view visibility state variables
    toggleStateElement('loading-state', true);
    toggleStateElement('error-state', false);
    toggleStateElement('empty-state', false);
    toggleStateElement('grid-view', false);
    toggleStateElement('detail-view', false);

    try {
        // Run parallel fetch protocol
        masterStationData = await fetchDashboardData();
        
        toggleStateElement('loading-state', false);
        toggleStateElement('grid-view', true);
        
        // Render current stable dataset
        renderDashboardGrid(masterStationData, handleStationSelection);
    } catch (err) {
        toggleStateElement('loading-state', false);
        toggleStateElement('error-state', true);
    }
}

// Event Action: User selects a station card for analytical breakdown
async function handleStationSelection(station) {
    toggleStateElement('grid-view', false);
    toggleStateElement('loading-state', true);

    try {
        const hourlyData = await fetchStationDetails(station.lat, station.lon);
        toggleStateElement('loading-state', false);
        toggleStateElement('detail-view', true);
        
        renderDetailedProfile(station, hourlyData);
    } catch (error) {
        toggleStateElement('loading-state', false);
        toggleStateElement('error-state', true);
    }
}

// Event Action: Search input configuration utilizing JavaScript Array Filtering
document.getElementById('search-input').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();
    
    // Filter master array matching search criteria
    const filteredResults = masterStationData.filter(station => 
        station.name.toLowerCase().includes(query)
    );

    // Handle Empty Search Array Resolution State
    if (filteredResults.length === 0) {
        toggleStateElement('empty-state', true);
        toggleStateElement('grid-view', false);
    } else {
        toggleStateElement('empty-state', false);
        toggleStateElement('grid-view', true);
        renderDashboardGrid(filteredResults, handleStationSelection);
    }
});

// Back Navigation Event Action
document.getElementById('back-btn').addEventListener('click', () => {
    toggleStateElement('detail-view', false);
    toggleStateElement('grid-view', true);
});

// Retry button link handling assembly
document.getElementById('retry-btn').addEventListener('click', loadApplicationSystem);

// Initialize System Engine
loadApplicationSystem();