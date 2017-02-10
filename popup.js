$(function() {

	var redirectURLs = {}; 

// init UI
$("#changeInfo").on("click", function(){
	$("#changeInfo").replaceWith('<div id=changeInfo"><div id="changeInfoTrue">Change login information: </div>'); 
	$("#changeInfoTrue").append('<br><b>Username: <input type="text" name="newUsername" id="newUsername" /><br> Password:&nbsp; <input type="password" name="newPassword" id="newPassword"" /></b>&nbsp;<input type="button" value="Go!" id="goButton" /><!--input type="button" value="Cancel" id="cancelBtnInfo" /--></div>'); 

	$("#cancelBtnInfo").click(function() {
		$("#changeInfoTrue").remove(); 
	}); 

	$("#goButton").on("click", function(){
		var username = $("#newUsername").val(); 
		var password = $("#newPassword").val(); 
		$("#changeInfoTrue").replaceWith('<div class="italics">Your login information has been saved.</div>'); 

		chrome.storage.sync.set({'username' : username});
		chrome.storage.sync.set({'password' : password});
	});
});

chrome.runtime.sendMessage({ getRedirectURLs: true }, function(response) {
	redirectURLs = response.redirectURLs; 

	for (key in redirectURLs)
		$("#automaticNavigate").append('<option value="' + key + '">' + key + '</option>'); 

	chrome.storage.sync.get("navigate", function (obj) {  
		var navigate = obj.navigate || "None"; 

		$("#automaticNavigate option[value='" + navigate + "']").prop('selected', true); 
	}); 
});

chrome.storage.sync.get("extEnabled", function (obj) {  
	var enabled = obj.extEnabled; 
	$("#extEnabledCheckbox").prop('checked', enabled); 
}); 

$("#automaticNavigate").change(function() {
	var navigate = $('#automaticNavigate').find(":selected").val(); 

	if (navigate == "Add link...")
	{
		var textToAppend = ""; 
		textToAppend += '<div id="newLinkPanel">'; 

		textToAppend += 'Name: '; 
		textToAppend += '<input type="text" required id="newLinkName"/>'; 
		textToAppend += ' URL: '; 
		textToAppend += '<input type="url" id="newLinkUrl"/> '; 

		textToAppend += ' <input type="button" required value="Go" id="newLinkSubmit" />'; 
		// textToAppend += ' <input type="button" required value="Cancel" id="cancelBtnLink" />'; 

		textToAppend += '<br><br>'; 

		textToAppend += '</div>'; 

		$("#navigatePanel").append($.parseHTML(textToAppend)); 

		$("#newLinkSubmit").click(function () {
			var linkName = $("#newLinkName").val(); 
			var linkUrl = $("#newLinkUrl").val(); 

			$("#newLinkPanel").remove(); 

			if (linkName && linkUrl)
				addRedirectUrl(linkName, linkUrl); 
		}); 

		$("#cancelBtnLink").click(function() {
			$("#newLinkPanel").remove(); 
		}); 
	}
	else 
		chrome.storage.sync.set({'navigate' : navigate });
}); 

$("#extEnabledCheckbox").on("click", function() {
	var enable = $("#extEnabledCheckbox").is(":checked"); 
	chrome.storage.sync.set({'extEnabled' : enable});
}); 

// remove focus 
$('#extEnabledCheckbox').focus().blur();
});

function addRedirectUrl(name, link)
{
	chrome.runtime.sendMessage({ addRedirectUrl: true, name: name, link: link }); 
	$("#automaticNavigate").append('<option value="' + name + '">' + name + '</option>'); 
}