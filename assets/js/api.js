$(document).ready(function(){
    $.get('http://si.bringfeel.com:27826',function(data){
        var dJson = JSON.parse(data);
        $('#servidores').text(dJson.servidores);
        $('#ramusadaapi').text(dJson.ramusada);
        $('#RamUsada').text(Math.floor(dJson.ramusada / 1024 / 1000));
        $('#RamLibre').text(Math.floor(4096 - (dJson.ramusada / 1024 / 1000)));
        $('#RamTotal').text(dJson.ramtotal);
        $('#uptime').text(dJson.uptime);
        $('#cpus').text(Math.floor(dJson.cpus));
        $('#cpu').text(dJson.cpu);
	    $('#estado').text(dJson.estado);
	    $('#estadoapi').text(dJson.eapi);
		$('#ping').text(dJson.ping);
		$('#cpuv').text(dJson.cpuv);
		$('#so').text(dJson.so);
		$('#arq').text(dJson.arq);
		$('#djs').text(dJson.djs);
		$('#njs').text(dJson.njs);
		$('#smusic').text(dJson.smusic);
		$('#usuarios').text(dJson.usuarios);
    });
});
