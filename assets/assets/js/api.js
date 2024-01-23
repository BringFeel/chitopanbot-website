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

    const bytesToMegabytes = bytes => Math.round(bytes / (1024 * 1024)) ;
    const bytesToGb = bytes => Math.round(bytes / (1024 * 1024 * 1024)) ;

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
    label: data.charts[2].name,
    data: data.charts[2].data,
    borderColor: 'rgba(69, 140, 248, 0.8)',
    fill: false,
    tension: 0.1,
    suffix: ' ms'
};

const dataset4 = {
    label: data.charts[3].name,
    data: data.charts[3].data.map(bytesToMegabytes),
    borderColor: 'rgba(245, 40, 145, 0.8)',
    fill: false,
    tension: 0.1,
    suffix: ' MB'
};

const dataset5 = {
    label: data.charts[4].name,
    data: data.charts[4].data.map(bytesToMegabytes),
    borderColor: 'rgb(255, 0, 255)',
    fill: false,
    tension: 0.1,
    suffix: ' MB'
};

const dataset6 = {
    label: data.charts[5].name,
    data: data.charts[5].data,
    borderColor: 'rgb(0, 255, 255)',
    fill: false,
    tension: 0.1,
    suffix: '%'
};

const dataset7 = {
    label: data.charts[6].name,
    data: data.charts[6].data.map(bytesToGb),
    borderColor: "rgb(255, 255, 0)",
    color: "#FFFFFF",
    borderWidth: 1,
    fill: false,
    tension: 0.1,
    suffix: ' GB'
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

const DataBandwidth = {
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
        legend: {
            labels: {
                color: '#ffffffbf'
    }
}
    }
}
});
new Chart(discordapi, {
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
            color: "#ffffffbf"
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
    data: DataBandwidth,
    scaleFontColor: "#ffffffbf",
    options: {
    scales:{ 
        yAxes:{ 
            ticks: { 
                beginAtZero:true,
                color: '#ffffffbf',
                callback: function(value) {
                return value + ' GB';
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

}).catch(error => {
        console.log(error);
    });
}

fetchData();