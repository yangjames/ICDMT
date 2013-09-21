var map;

function mapSetup() {
    google.load('maps','3', {other_params: 'key=' + mapKey + '&sensor=true', callback: initMap});
}

function initMap() {
    var mapOptions = {
	center: new google.maps.LatLng(30.501786,-88.00088),
	zoom: 11,
	mapTypeId: google.maps.MapTypeId.HYBRID
    };
    
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    $('#testline').html("set to map canvas");
}


document.addEventListener('DOMContentLoaded',function() {
	document.removeEventListener('DOMContentLoaded',arguments.callee,false);
	mapSetup();
    }, false);
