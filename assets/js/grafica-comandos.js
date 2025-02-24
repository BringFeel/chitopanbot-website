const commands = document.querySelector("#commands");

const url = 'https://api.bringfeel.com.ar/chitopanbot/getCommands?startDate=2025-01-16%2013:01:01&dataPoints=50';

const requestOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'https://chitopanbot.bringfeel.com.ar',
  },
};

function fetchData() {
    fetch(url, requestOptions).then(response => {
        return response.json();
    }).then(data => {

	const formatDate = isoDate =>
    new Date(isoDate).toLocaleString(navigator.language, {
        timeZone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });

const datasets = Object.keys(data.charts).map(key => ({
    label: `${key}`,
    data: data.charts[key],
    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`,
    fill: false,
    tension: 0.1
}));

const DataServers = {
    labels: data.labels.map(formatDate),
    datasets: datasets
};



new Chart(commands, {
    type: 'line',
    data: DataServers,
    scaleFontColor: "#ffffffbf",
    options: {
    scales:{
        yAxes:{
            ticks: {
                beginAtZero:true,
                color: '#ffffffbf'
            }
        },
        xAxes: {
            ticks: {
                color: "#ffffffbf"
            }
        }
    },
    plugins: {
        title: {
            display: true,
            text: "Última Actualización: " + DataServers.labels[DataServers.labels.length - 1], //2024-01-22T17:29:00.000Z
            color: "#ffffffbf"
        },
        legend: {
            labels: {
                color: '#ffffffbf'
    }
}
    }
}
});

}).catch(error => {
        console.log(error);
    });
}
fetchData();
