// This file will control the sending of data thru the database

$('#send_data').click(function() {
    console.log("clicked send report");
    if(handshake()){
        try{
            console.log(image_loc);
            if(uploadImage()){
                console.log("sending reports");
            }
            else{
                console.log("error on upload");
            }
        }
        catch(e){
            alert(e);
        }
    }
    else{
        alert("ERROR handshake to server!");
    }
});

/// upload image
function uploadImage(){
    var imageURI = image_loc;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var ft = new FileTransfer();
    if(ft.upload(
        imageURI, 
        // "http://localhost/bfp/mobile-server/recieve-photo.php",
        "http://wordpresssample11.000webhostapp.com/mobile-server/recieve-photo.php",
        function(result) {
            // console.log(uploadImage_loc);
            if(uploadData()){
                //alert("INCIDENT REPORTED!!");
            }
            console.log("upload complete: " + JSON.stringify(result));
            return true;
        },
        function(error) {
            console.log("upload error: " + JSON.stringify(error));
            return false;
        }, options)){
        console.log("true");
        return true;
    }
    else{
        console.log("fale");
        return false;
    }

}
/// upload data to server
function uploadData(){
    console.log("uploading");
    // console.log(uploadImage_loc);
    var image = document.getElementById("imageURI").val
    console.log(document.getElementById("imageURI").val + " " + image);
    console.log("image location: " + document.getElementById("incident_lat").val + "," + document.getElementById("incident_long").val);
    try{
        $.ajax({
            type: "POST",
            url: "http://wordpresssample11.000webhostapp.com/mobile-server/get-departments.php",
            data:{
                'calculate': 'true',
                'user_lat': document.getElementById("incident_lat").val,
                'user_long': document.getElementById("incident_long").val
            },
            success: function(response){
                var dept = JSON.parse(response);
                alert("Reported to '" + dept.dept_name + "' Which is the nearest Fire Department");
                $.ajax({
                    type: "POST",
                    url: "http://wordpresssample11.000webhostapp.com/mobile-server/recieve-report.php",
                    data: {
                        'file_id': image.substr(image.lastIndexOf('/') + 1),
                        'user_id': document.getElementById("user_id").val,
                        'incident_lat': document.getElementById("incident_lat").val,
                        'incident_long': document.getElementById("incident_long").val,
                        'dept_id': dept.dept_id
                    },
                    success: function(response){
                        console.log(response);
                    }
                });
            }
        });
    }catch(e){
        console.log(e);
        return false;
    }
    return true;
    // var file_data = $('#image').prop('files')[0];
    // if(!file_data = $('#image').prop('files')[0])) file_data = document.getElementById("youtubeimg").src; else alert('error');
    // alert(document.getElementById("img").src);
    // alert(JSON.stringify(file_data));
    // var form_data = new FormData();  // Create a FormData object
    // // form_data.append('file', file_data);  // Append all element in FormData  object
    // form_data.append('file_id', document.getElementById(image_loc.substr(image_loc.lastIndexOf('/') + 1)));
    // form_data.append('user_id', document.getElementById("user_id").val);
    // form_data.append('incident_loc', document.getElementById("incident_loc").val);
    // $.ajax({
    //         // url         : 'http://localhost/bfp/mobile-server/recieve-report.php',   // point to server-side PHP script 
    //         url: "http://halfbyte.000webhostapp.com/mobile-server/recieve-report.php",
    //         // dataType    : 'text',           // what to expect back from the PHP script, if anything
    //         data        : form_data,                         
    //         type        : 'post',
    //         success     : function(output){
    //             console.log(output);
    //             alert(output);              // display response from the PHP script, if any
    //         }
    //  });
     // $('#image').val('');                     /* Clear the input type file */
}