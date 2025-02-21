document.getElementById('primaryIntegerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const primaryInteger = BigInt(document.getElementById('primaryInteger').value);
    const cap = (primaryInteger - 1n) * 7n;
    let primeAnsweragen = 0n;
    let secondaryAnsweragen = 0n;
    let difference = 0n;
    let ratio = 0;

    const labels = [];
    const primeData = [];
    const secondaryData = [];
    const differenceData = [];
    const ratioData = [];

    // Calculate values and populate data arrays
    for (let it = 0n; it <= cap; it++) {
        primeAnsweragen = primaryInteger * it;
        secondaryAnsweragen = (primaryInteger - 1n) * (it + 1n);
        difference = primeAnsweragen - secondaryAnsweragen;
        if (primeAnsweragen !== 0n) {
            ratio = Number(secondaryAnsweragen) / Number(primeAnsweragen);
        } else {
            ratio = null;
        }

        labels.push(Number(it));
        primeData.push(Number(primeAnsweragen));
        secondaryData.push(Number(secondaryAnsweragen));
        differenceData.push(Number(difference));
        ratioData.push(ratio);

        console.log(primeAnsweragen + "," + secondaryAnsweragen + " | " + difference + " | " + ratio);
    }

    // Destroy existing chart if it exists
    const ctx = document.getElementById('myChart').getContext('2d');
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // Create new chart with updated data
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Prime Answeragen',
                    data: primeData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Secondary Answeragen',
                    data: secondaryData,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Difference',
                    data: differenceData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Ratio',
                    data: ratioData,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    fill: false,
                    yAxisID: 'y-axis-ratio'
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                'y-axis-ratio': {
                    beginAtZero: true,
                    position: 'right'
                }
            }
        }
    });
});