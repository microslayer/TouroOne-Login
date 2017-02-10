var redirectURLs = {
"blackboard"        : "https://bb-tc.touro.edu/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_33_1", 
"studentEmail"      : "http://mail.google.com/a/student.touro.edu/", 
"registration"      : "https://touroone.portal.touro.edu/web/touroone/registration", 
"academic"          : "https://touroone.portal.touro.edu/web/touroone/academic", 
"financialServices" : "https://touroone.portal.touro.edu/web/touroone/financial-services", 
"touchnet"          : "https://secure.touchnet.net/C21513_tsa/web/welcome.jsp", 
"none"              : "https://touroone.portal.touro.edu"
}

chrome.extension.onRequest.addListener(function(request, sender) {
	chrome.storage.sync.get("navigate", function (obj) {  

		var r_url = redirectURLs[ obj.navigate || "none"]; 

		console.log(obj.navigate); 

		chrome.tabs.update(sender.tab.id, { url: r_url });
	}); 

});
