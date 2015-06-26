var myhref = window.location.href;
var onedriveHref;
onedriveHref = {
	"name":"sdf",
	"url":'www.baidu.com',
	"value":myhref
};
console.log(myhref+'\n');
chrome.extension.sendMessage({"href" : myhref}, function(response) {
    console.log("response:", response);
});
