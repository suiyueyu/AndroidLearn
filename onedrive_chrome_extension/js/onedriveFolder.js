console.log('onedriveFolder.js is init');


$('body').append(
	'<div id="tmp_panel" class="">'
		+'<div id="tmp_panel_title">'
			+'<div class="onoffswitch onoffswitch-checked">'
			    +'<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>'
			    +'<label class="onoffswitch-label" for="myonoffswitch">'
			        +'<span class="onoffswitch-inner"></span>'
			        +'<span class="onoffswitch-switch"></span>'
		    	+'</label>'
			+'</div>'
			+'<a href="#" id="button_autowork">一键(beta)</a>&nbsp;&nbsp;&nbsp;'
			+'<a href="#" id="button_close" class="">显/隐！</a>&nbsp;&nbsp;&nbsp;'
		+'</div>'
		+'<span>list:<br></span>'
		+'<span id="link_num">现在共有: 0</span> '
		+'<div id="click_hint" style="display:none;">添加成功</div>'
		+'<textarea id="myLinklist"></textarea>'
	+'</div>'
	);



// <div class="onoffswitch">
//     <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
//     <label class="onoffswitch-label" for="myonoffswitch">
//         <span class="onoffswitch-inner"></span>
//         <span class="onoffswitch-switch"></span>
//     </label>
// </div>

$("#button_append_link").hover(function() {
	$("#button_append_link").css("background-color", "#");
}, function() {
	$("#button_append_link").css("background-color", "#f6f6f6");
});

$('myLinklist').css('height', '400px');

$('a#button_close').click(function() {
	event.preventDefault();

	$('#tmp_panel').toggleClass('hide');

});

$('.onoffswitch-label').click(function() {
	$(this).parent().toggleClass('onoffswitch-checked');
});

function updateLinkNum(PNG_link_num, NOT_PNG_link_num) {
	$('#link_num').html("当前共有PNG图片:&nbsp" + PNG_link_num + "&nbsp&nbsp&nbsp&nbsp" + "非PNG图片:&nbsp" + NOT_PNG_link_num);
}

function getIMGGroupNum () {
	if($('div.onoffswitch').hasClass('onoffswitch-checked')){
		return 3;
	}else{
		return 4;
	}
}

function autoWork() {


	// var exceptionFlag = {
	// 	"flag":false;
	// 	"detail":"";
	// }

	// @warning 文件名不要出现非法字符
	var exportFileName = ($('.BreadcrumbBar-item:last').html() || alert('文件名读取失败'));

	// 获取文件数量
	var fileNum = $('div.List-cell').length;
	// autowork_count = fileNum;

	var myqueue = new myQueue();

	myqueue.queue([function() {
		// 发一个消息把cookie清空
		chrome.runtime.sendMessage({
			"action": "clearCookies"
		}, function(response) {

		});

		setTimeout(function() {
			myqueue.dequeue();
		}, 500);
	}])

	// 点开所有的图片标签页
	for (var i = fileNum - 1; i >= 0; i--) {
		myqueue.queue([
			function() {
				$("span:contains('查看原件')").click();
				setTimeout(function() {
					myqueue.dequeue();
				}, 1500);
			},
			function() {
				// chrome.runtime.sendMessage({
				// 	// 询问后台当前的抓取情况
				// 	"action": "checkProcess",
				// }, function(response) {
				// 	// response 包括 pngfile的数量和非pngfile的数量
				// });

				$('button.OneUp-flipper--next').click();
				setTimeout(function() {
					myqueue.dequeue();
				}, 100);
			}
		]);
	};

	myqueue.queue([
		function() {
			// 从cookie中收集相关信息
			// var file_array = Cookies.get('file_array',{domain:'http://2222.moe/'});
			// console.log(file_array);

			chrome.runtime.sendMessage({
				"action": "colleLink"
			}, function(response) {
				console.log(response);
				// var file_array = response.file_array;

				var exportText = organizeFileByImgGroupNum(response.file_array, getIMGGroupNum());
				exportFileName += ".txt";
				var blob = new Blob([exportText], {
					type: "text/plain;charset=utf-8"
				});
				saveAs(blob, exportFileName);
				setTimeout(function() {
					myqueue.dequeue();
				}, 100);

			});

		}
	]);
	myqueue.dequeue();

}

function organizeFileByImgGroupNum(file_array, IMG_GROUP_NUM) {
	// file_array = {
	// "png_files": [],
	// "not_png_files": []
	// }
	var resultString = "";
	var PNGLinkArray = file_array.png_files;
	var notPNGLinkArray = file_array.not_png_files;

	var groupNum = PNGLinkArray.length / IMG_GROUP_NUM;

	// 将非PNG链接放到最前
	for (var i = notPNGLinkArray.length - 1; i >= 0; i--) {
		resultString += notPNGLinkArray[i] + "\r\n";
	};
	if (notPNGLinkArray.length > 0) {
		resultString += "\r\n";
	}

	if (PNGLinkArray.length % IMG_GROUP_NUM) {
		console.error("抓取的数量" + PNGLinkArray.length + "不是" + IMG_GROUP_NUM + "的倍数");
		alert("抓取的数量" + PNGLinkArray.length + "不是" + IMG_GROUP_NUM + "的倍数");
	};


	if (IMG_GROUP_NUM == 3) {
		// 数组内元素按照 xx s v 出现
		var link = {
			xx: "",
			s: "",
			v: "",
		};
		for (var i = 0; i < groupNum; i++) {
			link.xx = PNGLinkArray[i * IMG_GROUP_NUM];
			link.s = PNGLinkArray[i * IMG_GROUP_NUM + 1];
			link.v = PNGLinkArray[i * IMG_GROUP_NUM + 2];

			// 第一组 xx s
			resultString += ('[URL=' + link.xx + '][IMG]' + link.s + '[/IMG][/URL] ');

			// 第二组 v s
			resultString += ('[URL=' + link.v + '][IMG]' + link.s + '[/IMG][/URL]\r\n');

		};


	} else if (IMG_GROUP_NUM == 4) {
		// 数组内元素按照 xx s u v 出现
		var link = {
			xx: "",
			s: "",
			u: "",
			v: "",
		};
		for (var i = 0; i < groupNum; i++) {
			link.xx = PNGLinkArray[i * IMG_GROUP_NUM];
			link.s = PNGLinkArray[i * IMG_GROUP_NUM + 1];
			link.u = PNGLinkArray[i * IMG_GROUP_NUM + 2];
			link.v = PNGLinkArray[i * IMG_GROUP_NUM + 2];

			// 第一组 xx s
			resultString += '[URL=' + link.xx + '][IMG]' + link.s + '[/IMG][/URL] ';

			// 第二组 v s
			resultString += '[URL=' + link.v + '][IMG]' + link.s + '[/IMG][/URL] ';

			// 第三组 u s
			resultString += '[URL=' + link.u + '][IMG]' + link.s + '[/IMG][/URL]\r\n';

		};



	} else {
		console.error("数组的数量设置有误");
	}

	$('#myLinklist').val(resultString);

	return resultString;
}

$('a#button_autowork').click(function() {
	event.preventDefault();
	autoWork();
});
// $('button.OneUp-flipper--next')
// .OneUp-flipper--available

// $("span:contains('查看原件')")