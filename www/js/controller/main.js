var image_loc = "img/logo.png";
var your_loc;

/// click report my location
$('#report').click(function(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI }); 
});


/// ui code
$('#details').click(function(){
    var image = document.getElementById('img');
    var cont = document.getElementById('details_cont');
    if (cont.style.display === 'none') {
        console.log("open");
        cont.style.display = 'block';
    }
    else {
        console.log("close");
        cont.style.display = 'none';
    }
    var map = document.getElementById('map_canvas').offsetWidth;
    document.getElementById('desc').innerHTML = your_loc;
    image.style.width = map + "px";
    image.src = image_loc;
    document.getElementById("report").style.display = "none";
    document.getElementById("send").style.display = "block";
});


$('#register_btn').click(function(){
    var lgn = document.getElementById('login');
    var rgtr = document.getElementById('register');
    lgn.style.display = "none";
    rgtr.style.display = "block";
    // console.log("register");
});

$("#login_btn").click(function(){
    var lgn = document.getElementById('login');
    var rgtr = document.getElementById('register');
    lgn.style.display = "block";
    rgtr.style.display = "none";
});



/// google map code
/// Feature need to add
//1. Departments need to be shown in map
var dept_data = [];

// function attachDeptName(dept_marker, dept_name){
//     var infowindow = new google.maps.InfoWindow({
//       content: dept_name
//     });

//     dept_marker.addListener('click', function() {
//       infowindow.open(dept_marker.get('map'), dept_marker);
//     });
// }
function get_data(data){
    dept_data = data;
    console.log(data);
    console.log(dept_data);
    navigator.geolocation.getCurrentPosition(function(position) {
        var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // Initialize the Google Maps API v3
        your_loc = "Your Coordinates is: latitude: " + position.coords.latitude +
                    ", longitude: " + position.coords.longitude;
        var map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            zoom: 26,
            center: point,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        });
        try{
            dept_data.forEach(function (arrayItem) {
                if(arrayItem){
                    console.log(arrayItem.dept_name);
                    var dept_points = new google.maps.LatLng(arrayItem.dept_lat, arrayItem.dept_long);
                    var dept_marker = new google.maps.Marker({
                        position: dept_points,
                        map: map,
                        title: arrayItem.dept_name
                    });
                    // attachDeptName(marker, arrayItem.dept_name);
                }
            });
            // console.log(data);
            // Place a marker
            var marker = new google.maps.Marker({
                position: point,
                map: map,
                title: "This is your Location"
            });
            document.getElementById("incident_lat").val = position.coords.latitude;
            document.getElementById("incident_long").val = position.coords.longitude;
            var contentString = '<div id="content">'+
                'This is your location' +
                '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        }catch(e){
            console.log("ERROR!" + e);
        }
    });
}


var imageURI = "";
function onSuccess(imageURI) {
    try{
        document.getElementById("imageURI").val = imageURI;
        image_loc = imageURI;
        var image = document.getElementById('img');
        var map = document.getElementById('map_canvas').offsetWidth;
        image.style.width = map + "px";
        image.src = image_loc;
        document.getElementById('ui').style.display = 'block';
        $.ajax({
                    type: "POST",
                    url: "http://wordpresssample11.000webhostapp.com/mobile-server/get-departments.php",
                    data:{
                        'get': 'true'
                    },
                    success: function(response){
                        console.log(response);
                        try{
                            dept_data = JSON.parse(response);
                            get_data(dept_data);

                        }catch(e){
                            console.log(e);
                        }
                    }

                });
    }catch(e){
        alert(e);
    }

}



function onFail(message) {
    alert('Failed because: ' + message);
}


