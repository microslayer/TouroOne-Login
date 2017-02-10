var studentUsername; 
var studentPassword; 
var extEnabled; 

// todo fix 
chrome.storage.sync.get("username", function (obj) {  
	studentUsername = obj.username; 

	chrome.storage.sync.get("password", function (obj) {  
		studentPassword = obj.password; 

		chrome.storage.sync.get("extEnabled", function (obj) {  
			extEnabled = obj.extEnabled || true; 

			if (extEnabled) {
				$.post("/sso/login", { 
					username: studentUsername, 
					password: studentPassword, 
					lt: document.getElementsByName("lt")[0].value, 
					execution: document.getElementsByName("execution")[0].value, 
					_eventId: "submit" 
				}); 

				chrome.extension.sendRequest({redirect: true});
			}
		});
	});
});
