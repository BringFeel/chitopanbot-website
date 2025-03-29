const servers = document.querySelector("#servers");
const users= document.querySelector("#users");
const discordapi = document.querySelector("#discordapi");
const system = document.querySelector("#system");
const bandwidth = document.querySelector("#bandwidth");

function fechaAtrasada30Dias() {
  const hoy = new Date();
  hoy.setDate(hoy.getDate() - 30);

  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  const horas = String(hoy.getHours()).padStart(2, '0');
  const minutos = String(hoy.getMinutes()).padStart(2, '0');
  const segundos = String(hoy.getSeconds()).padStart(2, '0');

  return `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
}

const url = `https://cors-anywhere.bringfeel.com.ar/https://api.bringfeel.com.ar/chitopanbot/getStatus?startDate=${fechaAtrasada30Dias()}&dataPoints=50`;

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
    const bytesToMegabytes = bytes => Math.round(bytes / (1024 * 1024));
    const bytesToGb = bytes => Math.round(bytes / (1024 * 1024 * 1024));
	function formatearNumeroConPuntos(numero) {
		var numeroCadena = numero.toString();

        var numeroFormateado = numeroCadena.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return numeroFormateado;
    }

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

const dataset1 = { //Servers
    label: "Server Count",
    data: data.charts.serverCount.data,
    borderColor: 'rgba(248, 37, 37, 0.8)',
    fill: false,
    tension: 0.1
};

const dataset2 = { //Users
    label: "User Count",
    data: data.charts.userCount.data,
    borderColor: 'rgba(69, 248, 84, 0.8)',
    fill: false,
    tension: 0.1
};

const dataset3 = { //Api
    label: "ChitoPanBOT to Discord API",
    data: data.charts.discordAPIPing.data.map(value => value === 0 ? null : value),
    borderColor: '#6C0F0F',
    fill: false,
    tension: 0.1,
    suffix: ' ms'
};

const dataset4 = { //RAM
    label: "RAM Usage",
    data: data.charts.ramUsage.data.map(bytesToMegabytes),
    borderColor: 'rgba(245, 40, 145, 0.8)',
    fill: false,
    tension: 0.1,
    suffix: ' MB'
};

const dataset5 = { //CPU
    label: "CPU Usage",
    data: data.charts.cpuUsage.data,
    borderColor: 'rgb(255, 0, 255)',
    fill: false,
    tension: 0.1,
    suffix: '%'
};

const DataServers = {
    labels: data.charts.labels.map(formatDate),
    datasets: [dataset1]
};

const DataUsers = {
    labels: data.charts.labels.map(formatDate),
    datasets: [dataset2]
};

const DataDiscordAPI = {
    labels: data.charts.labels.map(formatDate),
    datasets: [dataset3]
};

const DataSystem = {
    labels: data.charts.labels.map(formatDate),
    datasets: [dataset4,dataset5]
};



new Chart(servers, {
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
		subtitle: {
			display: true,
			text: "Server Count: " + DataServers.datasets[0].data[DataServers.datasets[0].data.length - 1],
            color: "#ffffffbf",
            position: "bottom"
		},
        legend: {
            labels: {
                color: '#ffffffbf'
    }
}
    }
}
});
new Chart(users, {
    type: 'line',
    data: DataUsers,
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
            text: "Última Actualización: " + DataUsers.labels[DataUsers.labels.length - 1],
            color: "#ffffffbf"
        },
		subtitle: {
			display: true,
			text: "User Count: " + formatearNumeroConPuntos(DataUsers.datasets[0].data[DataUsers.datasets[0].data.length - 1]),
            color: "#ffffffbf",
            position: "bottom"
		},
        legend: {
            labels: {
                color: '#ffffffbf'
    }
}
    }
}
});
var DiscordAPIChart = new Chart(discordapi, {
    type: 'line',
    data: DataDiscordAPI,
    scaleFontColor: "#ffffffbf",
    options: {
    scales:{
        yAxes:{
            ticks: {
                beginAtZero:true,
                color: '#ffffffbf',
                callback: function(value) {
                return value + ' ms';
                }
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
            text: "Última Actualización: " + DataDiscordAPI.labels[DataServers.labels.length - 1],
            color: "#ffffffbf",
        },
        legend: {
            labels: {
                color: '#ffffffbf'
    }
},
    tooltip: {
        callbacks: {
            label: (context) => `${context.dataset.label}: ${context.parsed.y}${context.dataset.suffix}`
        }
    }
    }
}
});

new Chart(system, {
    type: 'line',
    data: DataSystem,
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
            text: "Última Actualización: " + DataSystem.labels[DataSystem.labels.length - 1],
            color: "#ffffffbf"
        },
		subtitle: {
			display: true,
			text: "RAM Usage: " + DataSystem.datasets[0].data[DataSystem.datasets[0].data.length - 1] + "MB | CPU Usage: " + DataSystem.datasets[1].data[DataSystem.datasets[1].data.length - 1] + "%",
            color: "#ffffffbf",
            position: "bottom"
		},
        legend: {
            labels: {
                color: '#ffffffbf'
            }
        },
    tooltip: {
        callbacks: {
            label: (context) => `${context.dataset.label}: ${context.parsed.y}${context.dataset.suffix}`
        }
    }
    }
}
});

function fetchDataInfo() {
    fetch("https://discordstatus.com/metrics-display/5k2rt9f7pmny/day.json").then(response => {
        return response.json();
    }).then(dataLast => {

    const discordAData = data.charts.discordAPIPing.data;
	const first94Values = dataLast.metrics[0].data.slice(0, discordAData.length).map(item => item.value);
    const orderedValues = Array.from({ length: first94Values.length }, (_, index) => first94Values[index]);

    const newDataset2 = {
        label: "Official Discord API",
        data: orderedValues,
        borderColor: '#5865F2',
        fill: false,
		label: "Official Discord API",
		suffix: " ms",
		tension: 0.1
    }

    const SubtitleChartDSAPI = {
		display: true,
		text: "ChitoPanBOT: " + discordAData[discordAData.length - 1] + "ms | Official Discord API: " + orderedValues[orderedValues.length - 1] + "ms",
        color: "#ffffffbf",
        position: "bottom"
	}

    DataDiscordAPI.datasets.push(newDataset2);
	DiscordAPIChart.options.plugins.subtitle = SubtitleChartDSAPI;
	DiscordAPIChart.update();
});
}
fetchDataInfo()

}).catch(error => {
        console.log(error);
    });
}

fetchData();
