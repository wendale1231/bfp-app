$("#getreports").click(function(){
	console.log("Loading Feed");
	$.ajax({
		type: "POST",
		dataType: "html",
		url: "http://halfbyte.000webhostapp.com/mobile-server/get-reports.php",
		data:{
			'user_id': document.getElementById("user_id").val,
		},
		success: function(html){
			console.log(html);
			document.getElementById("feed").innerHTML = html;
		}
	});
});