function convertirMilisegundosATiempo(milisegundos) {

    var horas = Math.floor(milisegundos / 3600000);
    var minutos = Math.floor((milisegundos % 3600000) / 60000);
    var segundos = Math.floor((milisegundos % 60000) / 1000);

    var tiempoFormateado = horas + "h " + minutos + "m " + segundos + "s";

    return tiempoFormateado;
    }

	function formatearNumeroConPuntos(numero) {
		var numeroCadena = numero.toString();

        var numeroFormateado = numeroCadena.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return numeroFormateado;
    }
	const urlParams = new URLSearchParams(window.location.search);
    const song = urlParams.get('song');

	if (song === null) {
	$(".mensajeCarga").remove();
	var ErrorMessage = document.getElementById("ErrorMessage");
	ErrorMessage.innerHTML = "No se encontró el parámetro song.";
    }

    const url = `https://cors.unmutedte.ch/https://api.popcat.xyz/lyrics?song=${song}`;

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

    if (data.error === "Please provide 'song' query in request URL") {
	
		$(".mensajeCarga").remove();
		
		var ErrorMessage = document.getElementById("ErrorMessage");
        return ErrorMessage.innerHTML = "No se proporcionó una canción.";
	}

	if (data.error === "Song not found!") {
	
	$(".mensajeCarga").remove();
	
	var ErrorMessage = document.getElementById("ErrorMessage");
	return ErrorMessage.innerHTML = "Canción no encontrada.";
    }

	if (data.error) {

	$(".mensajeCarga").remove();
	var ErrorMessage = document.getElementById("ErrorMessage");
	console.log(data.error)
	return ErrorMessage.innerHTML = "Ocurrió algún error desconocido, por favor informa a soporte.";
    }

	$("#artista-cancion").text(data.artist + " - " + data.title)
	$('#letra').html(data.lyrics.replace(/\n/g, '<br>'))

	const urlInfoLast = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=79049ebcaa576f269f938328f424c5f0&artist=${data.artist}&track=${song}&format=json`;

	function fetchDataInfo() {
    fetch(urlInfoLast, requestOptions).then(response => {
        return response.json();
    }).then(dataLast => {

		if (dataLast.error === 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 10 || 11 || 13 || 16 || 26 || 29) {
        console.log("La Api de Last.fm arrojó el siguiente error: " + dataLast.error)
	    return;
        }

	ImageElement = document.getElementById("ImageAlbum");
	ImageElement.src = dataLast.track.album.image[2]["#text"]
	tdElement = document.getElementById("LastLink");
    var enlace = document.createElement("a");
	enlace.href = dataLast.track.url;
    enlace.innerHTML = dataLast.track.url;
	enlace.style.borderBottom = "0";
	enlace.target = "_blank";
    tdElement.innerHTML = ""; 
    tdElement.appendChild(enlace);
    console.log(dataLast)
	const nombres = dataLast.track.toptags.tag.map(objeto => objeto.name);
    nombres.sort();
    const nombresOrdenados = nombres.map((nombre) => ` ${nombre}`);

	$("#LastArtista").text(dataLast.track.artist.name)
	$("#LastAlbum").text(dataLast.track.album.title)
	$("#LastSong").text(dataLast.track.name)
	$("#LastPublishDate").text(dataLast.track.wiki.published)
	$("#LastTags").text(nombresOrdenados)
	$("#LastDuration").text(convertirMilisegundosATiempo(dataLast.track.duration))
	$("#LastPlayCount").text(formatearNumeroConPuntos(dataLast.track.playcount))
	$("#LastListeners").text(formatearNumeroConPuntos(dataLast.track.listeners))
	

	$(".mensajeCarga").remove();
    $(".ViewContent").removeClass("hidden");
    
});
}

fetchDataInfo()

	});
}

fetchData()