const ctx = document.getElementById('populationChart').getContext('2d');

// Récupérer les données depuis l'API
async function fetchPopulationData(ville) {
    const response = await fetch(`http://localhost:3000/api/population/${ville}`);
    const data = await response.json();
    return data;
}

// Créer un graphique avec Chart.js
async function createChart(ville) {
    const data = await fetchPopulationData(ville);

    const labels = data.map(item => item.annee); // Années
    const populations = data.map(item => item.population); // Populations

    new Chart(ctx, {
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

// Appeler la fonction pour créer le graphique
createChart('Paris');
