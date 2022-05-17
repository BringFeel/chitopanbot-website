$(document).ready(function(){
    $.get('http://usa3.starnode.us:27826',function(data){
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
    });
});
