// 将文件切割成xxxx.png的格式方便比较
function getFileName(a) {

	a = a.substring(a.indexOf('.com/') + 5, a.length);

	a = a.substring(a.indexOf('/') + 1, a.length);
	// $equ_a = $equ_a.substring($equ_a.indexOf('/')+1,$equ_a.indexOf('.'));

	return a;
}

// 字符串的长度比较，如果最后一位是字母，则其长度减1
// 即认为10000.png 与 10000s.png是等阶的
// 但是具有相同前缀的串 10000.png 与 100000.png 是不相阶的，
// 他们不应该放到一起按照字符串比较
// 由于这里并不是要排序，所以只需要区分大小，按照长的大短的小
function stringLengthCompare(a, b) {

	// 将10000s.png换成1000s
	// 10000.png => 10000
	a = a.replace(/\.png/, '');
	b = b.replace(/\.png/, '');

	a = a.replace(/[a-zA-Z]+$/, '');
	b = b.replace(/[a-zA-Z]+$/, '');

	if (a.length > b.length) {
		// 长度大于
		return 1;
	} else if (a.length < b.length) {
		// 长度小于
		return -1;
	} else {
		// 长度相等
		return 0;
	}
}

// 比较两个串的大小
// 先将他们切割成方便比较的形式，例如10000.png or 1000s.png
// 再先判断他们的长度
// 最后按照字符串的规则比较

function fileLinkSort(a, b) {

	var nameA = getFileName(a);

	var nameB = getFileName(b);

	var compareResultByLength = stringLengthCompare(nameA, nameB);
	// 若两个串长度相等，他们可以按照字符串比较了
	if (!compareResultByLength) {

		// 把.png 切掉,成10000
		// 因为和 '.' 比较没有意义

		nameA = nameA.substring(nameA.indexOf('/') + 1, nameA.indexOf('.'));
		nameB = nameB.substring(nameB.indexOf('/') + 1, nameB.indexOf('.'));

		return nameA.localeCompare(nameB);
	}
	return compareResultByLength;

}

/**
 * getFileType 获取文件后缀名
 * @param file 输入文件名
 * @return 文件后缀名 例如 "png", 若输入格式不正确，则返回原串
 */
function getFileType(file) {


	if (-1 == file.lastIndexOf('.')) {
		var errorInfo = "输入的文件名格式不正确,没有后缀名";
		console.error(errorInfo + "+" + file);
		alert(errorInfo + "+" + file);
	}
	return file.substring(file.lastIndexOf('.') + 1, file.length);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	// 加入链接
	if (request.action == "addLink") {
		// 从cookie中取出数据
		var file_array;

		chrome.cookies.get({
			"name": "file_array",
			"url": "http://2222.moe/"
		}, function(cookies) {
			// 第一次则新建数组
			if (!cookies) {
				file_array = {
					"png_files": [],
					"not_png_files": []

				}
			} else {
				file_array = JSON.parse(cookies.value);
			}
			// 切掉链接最后的无用参数
			request.href = request.href.substr(0, request.href.indexOf('?'));
			//  检查文件类型
			if ("png" == (getFileType(request.href).toLowerCase())) {
				file_array.png_files.push(request.href);
			} else {
				file_array.not_png_files.push(request.href);
			}

			chrome.cookies.set({
				"name": "file_array",
				// "key":file_key,
				"url": "http://2222.moe/",
				"value": JSON.stringify(file_array)
			}, function(value) {
				console.log(file_array);
				chrome.tabs.query({
					active: true,
					currentWindow: true
				}, function(tabs) {

					// 关掉打开的页面
					// chrome.tabs.remove(tabs[0].id,function () {

					// })
				});
			});

		});
	} else if (request.action == "checkProcess") {
		// 检查加入的情况，但是先不写了
	} else if (request.action == "colleLink") {
		// 从cookie中取出数据
		var file_array;

		chrome.cookies.get({
			"name": "file_array",
			"url": "http://2222.moe/"
		}, function(cookies) {
			// 第一次则新建数组
			if (!cookies) {
				console.error("检查cookie是否打开");
			} else {
				file_array = JSON.parse(cookies.value);
			}
			file_array.png_files.sort(fileLinkSort);
		});
		sendResponse({"file_array":file_array});

	} else {

	}
	// var file_key = myStringSplit(request.href);



	////////////////////////////////////////

	/////////////////////////////////////

});