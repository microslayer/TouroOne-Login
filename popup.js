$(document).ready(function() {

	$("#changeInfo").on("click", function(){

	$("#changeInfo").replaceWith('<div id=changeInfo"><div id="changeInfoTrue">Change login information: </div>'); 

	$("#changeInfoTrue").append('<br><b>Username: <input type="text" name="newUsername" id="newUsername" /><br> Password:&nbsp; <input type="password" name="newPassword" id="newPassword"" /></b>&nbsp;<input type="button" value="Go!" id="goButton" /></div>'); 

	$("#goButton").on("click", function(){
	var username = $("#newUsername").val(); 
	var password = $("#newPassword").val(); 
	$("#changeInfoTrue").replaceWith('<div class="italics">Your login information has been saved.</div>'); 
   	
	chrome.storage.sync.set({'username' : username}, function() {console.log('Saved  username');});
chrome.storage.sync.set({'password' : password}, function() {console.log('Saved password');});

});
        
});

});