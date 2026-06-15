// Pre-defined coordinate matrix for regional agricultural hubs
const STATIONS = [
    { name: "Kigali", lat: -1.9499, lon: 30.0588 },
    { name: "Nairobi", lat: -1.2833, lon: 36.8167 },
    { name: "Mombasa", lat: -4.0544, lon: 39.6636 },
    { name: "Kampala", lat: 0.3136, lon: 32.5811 }
];

// FETCH 1: Parallel request fetching current conditions for all stations
export async function fetchDashboardData() {
    try {
        const promises = STATIONS.map(async (station) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${station.lat}&longitude=${station.lon}&current=temperature_2m,wind_speed_10m,direct_normal_irradiance&timezone=auto`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed network sync for ${station.name}`);
            
            const data = await response.json();
            
            // Object Transformation & Destructuring
            const { temperature_2m, wind_speed_10m, direct_normal_irradiance } = data.current;
            
            return {
                name: station.name,
                lat: station.lat,
                lon: station.lon,
                temp: temperature_2m,
                wind: wind_speed_10m,
                solar: direct_normal_irradiance ?? 0 // Optional chaining fallback
            };
        });

        // Execute all network requests in parallel
        return await Promise.all(promises);
    } catch (error) {
        console.error("Data Layer Error:", error);
        throw error;
    }
}

// FETCH 2: Deep dive hourly fetch for a selected station's detail view
export async function fetchStationDetails(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,direct_normal_irradiance&forecast_days=1&timezone=auto`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to retrieve hourly station array data.");
    
    const data = await response.json();
    return data.hourly; 
}