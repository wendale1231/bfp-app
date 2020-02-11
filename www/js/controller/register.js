// This JS will control the registration of the users


function check(){
    try{
        if($("#f_name").val() != ""){
            if($("#l_name").val() != ""){
                if($("#rusername").val() != ""){
                    if($("#frpassword").val() != ""){
                        if($("rpassword").val() != ){
                            console.log("all done");
                            return true;
                        }
                    }
                }
            }
        }
        else{
            alert("Please fill all the fields!");
            return false;
        }
    }catch(e){
        console.log(e);
    }
}

$("#submit_reg").click(function(){
    console.log("hello");
    try{
        console.log($("#f_name").val());
        console.log($("#l_name").val());
        console.log($("#rusername").val());
        console.log($("#frpassword").val());
        console.log($("#rpassword").val());
    }catch(e){
        console.log(e);
    }
});



