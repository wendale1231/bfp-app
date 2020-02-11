// This JS will control the login flow and auth




$('#login_btn').click(function(){
    if(handshake()){
        let user = $('#username').val();
        let pass = $('#password').val();
        $.ajax({
            type: "POST",
            // url: "http://localhost/bfp/mobile-server/login-auth.php",
            url: "http://wordpresssample11.000webhostapp.com/mobile-server/login-auth.php",
            data: {
                'username': user,
                'password': pass
            },
            success: function(data) {
                var profile_data;
                try{
                    profile_data = JSON.parse(data.toString());
                    console.log(profile_data);
                    document.getElementById("login").style.display = "none";
                    document.getElementById("home").style.display = "block";
                    document.getElementById("dropdown01").innerHTML = profile_data.first_name;
                    document.getElementById("user_id").val = profile_data.u_reg_id;
                    console.log(document.getElementById("user_id").val);
                }
                catch(e){
                    alert("Wrong Username or Password");
                }
            }
        });
    }
    else{
        alert("ERROR handshake to server");
    }
});

