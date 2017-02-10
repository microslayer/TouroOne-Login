var studentUsername; 
var studentPassword; 
var extEnabled; 

// todo fix 
chrome.storage.sync.get("username", function (obj) {  
	studentUsername = obj.username; 

	chrome.storage.sync.get("password", function (obj) {  
		studentPassword = obj.password; 

		chrome.storage.sync.get("extEnabled", function (obj) {  
			extEnabled = obj.extEnabled == false ? false : true;  // default = true

			if (extEnabled) {
				if (window.location.href.startsWith("https://touroone.touro.edu/sso/login"))
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
