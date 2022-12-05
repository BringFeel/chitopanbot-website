function fetchData() {
	fetch('https://api.statcord.com/v3/779841907484262421').then(response => {
		return response.json();
	}).then(data => {

		$('#servidores').text(data.data[0].servers);
        $('#RamUsada').text(`${Math.floor(data.data[0].memactive / 1048576)}Mb`);
        $('#RamLibre').text(`${Math.floor(1024 - (data.data[0].memactive / 1048576))}Mb`);
        $('#RamTotal').text('1024Mb');
        $('#RedUsada').text(`${Math.floor(data.data[0].bandwidth / 1048576)}Mb`);
        $('#usuarios').text(data.data[0].users);
        $('#njs').text('v19.1.0');
        $('#djs').text('v14.4.0');

        if (data.error = false) {
        $('#estado').text('Offline');
        }
        else {
        $('#estado').text('Online');
        }

        if (data.error = true) {
            $('#estadoapi').text(``);
            }
	}).catch(error => {
		console.log(error);
	});
}

fetchData();
