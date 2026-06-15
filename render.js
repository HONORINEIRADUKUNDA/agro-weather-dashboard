// Helper to toggle visibility states safely
export function toggleStateElement(elementId, shouldShow) {
    const el = document.getElementById(elementId);
    if (shouldShow) {
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
}

// Renders the main overview cards
export function renderDashboardGrid(stationsArray, onCardClickCallback) {
    const gridContainer = document.getElementById('card-grid');
    gridContainer.innerHTML = ''; // Clear prior entries

    stationsArray.forEach(station => {
        const card = document.createElement('div');
        card.className = 'station-card';
        
        // Custom interactive accessibility feature
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        card.innerHTML = `
            <h3>${station.name} Station</h3>
            <hr>
            <p><strong>Temperature:</strong> ${station.temp}°C</p>
            <p><strong>Wind Speed:</strong> ${station.wind} km/h</p>
            <p><strong>Direct Solar Irradiance:</strong> ${station.solar} W/m²</p>
            <span class="action-link">Analyze Hourly Profile →</span>
        `;

        // Wire up interaction to open the details view
        const triggerEvent = () => onCardClickCallback(station);
        card.addEventListener('click', triggerEvent);
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter') triggerEvent(); });

        gridContainer.appendChild(card);
    });
}

// Renders the deep-dive view using array transformation (.map)
export function renderDetailedProfile(station, hourlyData) {
    const contentArea = document.getElementById('detail-content');
    
    // Transform arrays into simple readable timestamp lists for crop management
    const timeRows = hourlyData.time.map((timeStr, index) => {
        const timeFormatted = new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = hourlyData.temperature_2m[index];
        const humidity = hourlyData.relative_humidity_2m[index];
        const solar = hourlyData.direct_normal_irradiance[index];

        return `
            <tr>
                <td>${timeFormatted}</td>
                <td>${temp}°C</td>
                <td>${humidity}%</td>
                <td>${solar} W/m²</td>
            </tr>
        `;
    }).join('');

    contentArea.innerHTML = `
        <h2>Operational Profile: ${station.name} Hub</h2>
        <p class="meta-coords">Coordinates: Lat ${station.lat}, Lon ${station.lon}</p>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Temp</th>
                        <th>Humidity</th>
                        <th>Solar Irradiance</th>
                    </tr>
                </thead>
                <tbody>
                    ${timeRows}
                </tbody>
            </table>
        </div>
    `;
}