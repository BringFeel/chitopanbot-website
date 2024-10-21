const servers = document.querySelector("#servers");
const users= document.querySelector("#users");
const discordapi = document.querySelector("#discordapi");
const system = document.querySelector("#system");
const bandwidth = document.querySelector("#bandwidth");

const url = 'https://cors.unmutedte.ch/https://disstat-api.tomatenkuchen.com/api/bots/chitopanbot?timezone=America/Buenos_Aires&locale=es-419&start=2023-07-17T0000&dataPoints=90';

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

const dataset1 = {
    label: data.charts[0].name,
    data: data.charts[0].data,
    borderColor: 'rgba(248, 37, 37, 0.8)',
    fill: false,
    tension: 0.1
};

const dataset2 = {
    label: data.charts[1].name,
    data: data.charts[1].data,
    borderColor: 'rgba(69, 248, 84, 0.8)',
    fill: false,
    tension: 0.1
};

const dataset3 = {
    label: "ChitoPanBOT to Discord API",
    data: data.charts[3].data,
    borderColor: '#6C0F0F',
    fill: false,
    tension: 0.1,
    suffix: ' ms'
};

const dataset4 = {
    label: data.charts[4].name,
    data: data.charts[4].data.map(bytesToMegabytes),
    borderColor: 'rgba(245, 40, 145, 0.8)',
    fill: false,
    tension: 0.1,
    suffix: ' MB'
};

const dataset5 = {
    label: data.charts[5].name,
    data: data.charts[5].data.map(bytesToMegabytes),
    borderColor: 'rgb(255, 0, 255)',
    fill: false,
    tension: 0.1,
    suffix: ' MB'
};

const dataset6 = {
    label: data.charts[6].name,
    data: data.charts[6].data,
    borderColor: 'rgb(0, 255, 255)',
    fill: false,
    tension: 0.1,
    suffix: '%'
};

const dataset7 = {
    label: data.charts[2].name,
    data: data.charts[2].data,
    borderColor: "rgb(255, 255, 0)",
    fill: false,
    tension: 0.1
};

const DataServers = {
    labels: data.charts[0].labels,
    datasets: [dataset1]
};

const DataUsers = {
    labels: data.charts[1].labels,
    datasets: [dataset2]
};

const DataDiscordAPI = {
    labels: data.charts[2].labels,
    datasets: [dataset3]
};

const DataSystem = {
    labels: data.charts[3].labels,
    datasets: [dataset4,dataset5,dataset6]
};

const DataShards = {
    labels: data.charts[6].labels,
    datasets: [dataset7]
    
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
            text: "Última Actualización: " + new Date(data.lastStats).toLocaleString(navigator.language, {timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone}),
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
            text: "Última Actualización: " + new Date(data.lastStats).toLocaleString(navigator.language, {timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone}),
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
            text: "Última Actualización: " + new Date(data.lastStats).toLocaleString(navigator.language, {timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone}),
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
            text: "Última Actualización: " + new Date(data.lastStats).toLocaleString(navigator.language, {timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone}),
            color: "#ffffffbf"
        },
		subtitle: {
			display: true,
			text: "RAM Usage: " + DataSystem.datasets[0].data[DataSystem.datasets[0].data.length - 1] + "MB | Total RAM: " + DataSystem.datasets[1].data[DataSystem.datasets[1].data.length - 1] + "MB | CPU Usage: " + DataSystem.datasets[2].data[DataSystem.datasets[2].data.length - 1] + "%",
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
new Chart(bandwidth, {
    type: 'line',
    data: DataShards,
    scaleFontColor: "#ffffffbf",
    options: {
    scales:{ 
        yAxes:{ 
            ticks: { 
                beginAtZero: true,
                color: '#ffffffbf',
                callback: function(value) {
                return value;
                }
            } 
        },
        xAxes: {
            ticks: {
                color: "#ffffffbf"
            }              
        },
        
     
    },
    plugins: {
        title: {
            display: true,
            text: "Última Actualización: " + new Date(data.lastStats).toLocaleString(navigator.language, {timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone}),
            color: "#ffffffbf"
        },
		subtitle: {
			display: true,
			text: "Shard Count: " + DataShards.datasets[0].data[DataShards.datasets[0].data.length - 1],
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
            label: (context) => `${context.dataset.label}: ${context.parsed.y}`
        }
    }
    }
}
});

function fetchDataInfo() {
    fetch("https://discordstatus.com/metrics-display/5k2rt9f7pmny/day.json").then(response => {
        return response.json();
    }).then(dataLast => {

	  var first94Values = dataLast.metrics[0].data.slice(0, data.charts[2].data.length).map(item => item.value);
      var orderedValues = Array.from({ length: first94Values.length }, (_, index) => first94Values[index]);

 var newDataset2 = {
                label: data.charts[1].name,
                data: orderedValues,
                borderColor: '#5865F2',
                fill: false,
				label: "Official Discord API",
				suffix: " ms",
				tension: 0.1
            }

            var SubtitleChartDSAPI = {
				display: true,
				text: "ChitoPanBOT: " + data.charts[3].data[data.charts[3].data.length - 1] + "ms | Official Discord API: " + orderedValues[orderedValues.length - 1] + "ms",
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
