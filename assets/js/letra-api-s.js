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
'Origin': 'https://bringfeel.com.ar',
},
};
async function fetchData() {
await fetch(url, requestOptions).then(response => {
	return response.json();
}).then(data => {

console.log(data)

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

$(".mensajeCarga").remove();
$(".ViewContent").removeClass("hidden");
ImageElement = document.getElementById("ImageAlbum");
ImageElement.src = data.image

});
}

fetchData()
