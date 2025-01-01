const ctx = document.getElementById('populationChart').getContext('2d');
let chart = null; // Variable pour garder une référence du graphique

// Récupérer les données depuis l'API
async function fetchPopulationData(ville) {
    const response = await fetch(`http://localhost:3000/api/population/${ville}`);
    const data = await response.json();
    return data;
}

// Récupérer la population future depuis l'API
async function fetchFuturePopulation(ville, years) {
    const response = await fetch(`http://localhost:3000/api/population-future/${ville}/${years}`);
    const data = await response.json();
    return data;
}

// Créer un graphique avec Chart.js
async function createChart(ville) {
    const data = await fetchPopulationData(ville);
    const labels = data.map(item => item.annee); // Années
    const populations = data.map(item => item.population); // Populations

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Évolution de la population de ${ville}`,
                data: populations,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Population au fil des années'
                }
            }
        }
    });
}

// Mettre à jour le graphique avec la population future
async function updateChart() {
    const years = document.getElementById('years').value;
    const ville = 'Paris'; // Nom de la ville
    const futureData = await fetchFuturePopulation(ville, years);
    
    // Mise à jour des labels (ajout de la population future)
    const futureYear = new Date().getFullYear() + parseInt(years); 
    const futurePopulation = futureData.futurePopulation;

    // Ajouter la population future au graphique
    chart.data.labels.push(futureYear); // Ajouter l'année future
    chart.data.datasets[0].data.push(futurePopulation); // Ajouter la population future

    // Recharger et mettre à jour le graphique après l'ajout des nouvelles données
    chart.update(); // Mettre à jour le graphique avec les nouvelles données
}

// Initialisation du graphique avec des données existantes
createChart('Paris');
