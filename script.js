document.getElementById('convertBtn').addEventListener('click', convertCurrency);

function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(response => response.json())
    .then(data => {
      const rates = data.rates;
      const rate = rates[to];

      if (rate) {
        const result = amount * rate;
        document.getElementById('result').innerText = `Converted Amount: ${result.toFixed(2)} ${to}`;
      } else {
        document.getElementById('result').innerText = 'Conversion rate unavailable';
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Fetch historical data and display chart
fetch('https://api.exchangerate-api.com/v4/latest/USD')
  .then(response => response.json())
  .then(data => {
    const dates = Object.keys(data.rates);
    const rates = Object.values(data.rates);

    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'USD to Other Currencies',
          data: rates,
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          borderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
