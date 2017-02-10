var redirectURLs = {
	"Blackboard"         : "https://bb-tc.touro.edu/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_33_1", 
	"Student Email"      : "http://mail.google.com/a/student.touro.edu/", 
	"Registration"       : "https://touroone.portal.touro.edu/web/touroone/registration", 
	"Academic"           : "https://touroone.portal.touro.edu/web/touroone/academic", 
	"Financial Services" : "https://touroone.portal.touro.edu/web/touroone/financial-services", 
	"None"               : "https://touroone.portal.touro.edu/?", 
	"Add link..."        : "", 
}

chrome.extension.onRequest.addListener(function(request, sender) {
	chrome.storage.sync.get("navigate", function (obj) {  
		var r_url = redirectURLs[ obj.navigate || "None"]; 

		if (r_url != "None")
			chrome.tabs.update(sender.tab.id, { url: r_url });
	}); 
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.getRedirectURLs)
		{
			sendResponse({ redirectURLs: redirectURLs });
		}
		else if (request.addRedirectUrl)
		{
			redirectURLs[request.name] = request.link; 
		}

	}); 