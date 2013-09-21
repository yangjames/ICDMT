var map;
var geocoder;

function mapSetup() {
    google.load('maps','3', {other_params: 'key=' + mapKey + '&sensor=true', callback: initMap});
}

function initMap() {
    var mapOptions = {
	center: new google.maps.LatLng(25,-90),
	zoom: 6,
	mapTypeId: google.maps.MapTypeId.HYBRID
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    geocoder = new google.maps.Geocoder();
    $('#testline').html("set to map canvas");
}

$('#geocoder-text').bind('keypress',function(e) {
	if(e.keyCode==13)
	    geocode($('#geocoder-text').val());
    });

$('#geocoder-button').click(function() {
	geocode($('#geocoder-text').val());
    });

function geocode(address) {
    geocoder.geocode({'address':address},function(results,status) {
	    if (status == google.maps.GeocoderStatus.OK)
		map.setCenter(results[0].geometry.location);
	});
}

document.addEventListener('DOMContentLoaded',function() {
	document.removeEventListener('DOMContentLoaded',arguments.callee,false);
	mapSetup();
    }, false);
