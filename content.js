var studentUsername; 
var studentPassword; 

chrome.storage.sync.get("username", function (obj) {  
    studentUsername = obj.username; 

chrome.storage.sync.get("password", function (obj) {  
    studentPassword = obj.password; 

var login = document.getElementById('user_id'); 
var password = document.getElementById('password'); 

login.value = studentUsername; 
password.value = studentPassword; 

var loginSubmit = document.getElementById('entry-login'); 
loginSubmit.click(); 

});
});
