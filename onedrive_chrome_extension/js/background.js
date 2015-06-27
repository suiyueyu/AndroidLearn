// 将文件切割成xxxx.png的格式方便比较
function myStringSplit(a) {

	a = a.substring(a.indexOf('.com/') + 5, a.length);

	a = a.substring(a.indexOf('/') + 1, a.length);
	// $equ_a = $equ_a.substring($equ_a.indexOf('/')+1,$equ_a.indexOf('.'));

	return a;
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	// var file_key = myStringSplit(request.href);

	// 从cookie中取出数据
	var file_array;

	chrome.cookies.get({
		"name": "file_array",
		"url": "http://2222.moe/"
	}, function(cookies) {
		// 新建数组
		if (!cookies) {
			file_array = {
				"png_files": [],
				"not_png_files": []

			}
		} else {
			file_array = JSON.parse(cookies.value);
		}
		file_array.png_files.push(request.href);


		chrome.cookies.set({
			"name": "file_array",
			// "key":file_key,
			"url": "http://2222.moe/",
			"value": JSON.stringify(file_array)
		}, function(value) {
			console.log(request);
			console.log(file_array);
			// console.log(myFileArray);
		});
	});


	////////////////////////////////////////

	/////////////////////////////////////

});


// <script type="text/javascript">

//         $(function() {
//             $("#setcookie").click(function() {
//                 var current = new Array();
//                 var user = new Object();
//                 user.FirstName = "Ares";
//                 user.LastName = "Chen";
//                 current.push(user);
//                 $.cookie(
//                     "test",
//                     JSON.stringify(current),
//                     { expires: 7,domain:"xizhang.com",path:"/"}); 
//                     //将数组转换为Json字符串保存在cookie中,过期时间为7天
//             });

//             $("#getcookie").click(function() {
//                 var current = new Array();
//                 current = JSON.parse($.cookie("test")); //从cookie中还原数组
//                 alert(current[0].FirstName+","+current[0].LastName);
//             });

//         });
//     </script>