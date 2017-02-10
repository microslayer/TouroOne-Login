$(function() {

// init UI
$("#changeInfo").on("click", function(){
	$("#changeInfo").replaceWith('<div id=changeInfo"><div id="changeInfoTrue">Change login information: </div>'); 
	$("#changeInfoTrue").append('<br><b>Username: <input type="text" name="newUsername" id="newUsername" /><br> Password:&nbsp; <input type="password" name="newPassword" id="newPassword"" /></b>&nbsp;<input type="button" value="Go!" id="goButton" /></div>'); 

	$("#goButton").on("click", function(){
		var username = $("#newUsername").val(); 
		var password = $("#newPassword").val(); 
		$("#changeInfoTrue").replaceWith('<div class="italics">Your login information has been saved.</div>'); 

		chrome.storage.sync.set({'username' : username});
		chrome.storage.sync.set({'password' : password});
	});
});

chrome.storage.sync.get("extEnabled", function (obj) {  
	var enabled = obj.extEnabled; 
	$("#extEnabledCheckbox").prop('checked', enabled); 
}); 

chrome.storage.sync.get("navigate", function (obj) {  
	var navigate = obj.navigate || "none"; 

	$("#automaticNavigate option[value=" + navigate + "]").prop('selected', true); 
}); 

$("#automaticNavigate").change(function() {
	var navigate = $('#automaticNavigate').find(":selected").attr('value'); 

	console.log(navigate); 

	chrome.storage.sync.set({'navigate' : navigate });
}); 

$("#extEnabledCheckbox").on("click", function() {
	var enable = $("#extEnabledCheckbox").is(":checked"); 
	chrome.storage.sync.set({'extEnabled' : enable});
}); 

// remove focus 
$('#extEnabledCheckbox').focus().blur();

});
