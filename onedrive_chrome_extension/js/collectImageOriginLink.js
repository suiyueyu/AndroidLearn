var fileLink = window.location.href;

console.log(fileLink + '\n');
// console.log(tabs[0].id);

chrome.runtime.sendMessage({
	"action": "addLink",
	"href": fileLink
}, function(response) {

	console.log("collectImageOriginLinks.js - response");
	console.log(response);
	console.log("collectImageOriginLinks.js - response end");
	
});