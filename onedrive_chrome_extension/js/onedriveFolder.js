console.log('onedriveFolder.js is init');


$('body').append('<div id="tmp_panel" class="hide"><div id = "tmp_panel_title">'
	// + '<a href="#" id="button_append_link">点击我增加</a>' 
	+ '<a href="#" id="button_autowork">一键(beta)</a>&nbsp;&nbsp;&nbsp;' + '<a href="#" id="button_close">显/隐！</a>&nbsp;&nbsp;&nbsp;' + '<a href="#" id="button_convert">转换！</a></div><span>list:<br /></span>' + '<span id = "link_num">现在共有: 0</span> ' + '<div id = "click_hint" style="display:none;">添加成功</div><textarea id="myLinklist"></textarea>' + '</div>');


// $("div#tmp_panel").css({
// 	"background": '#f6f6f6',
// 	"position": 'absolute',
// 	"width": '300px',
// 	"height": '200px',
// 	"z-index": '999',
// 	"right": '20px',
// 	"bottom": '20px'
// });

// $('#tmp_panel_title')
// 	// .css('background','#0071bc');
// 	.css('border-bottom', '1px black solid')
// 	.css('padding', '10px 0 10px 5px');


// $("#button_append_link")
// 	.css("background", "#f6f6f6")
// 	.css("height", "100%");

// $('#click_hint')
// 	.css('background', '#0071bc')
// 	.css('text-align', 'center')
// 	.css('color', 'white')
// 	.height('30px')
// 	.css('padding-top', '10px');


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


function updateLinkNum(PNG_link_num, NOT_PNG_link_num) {
	$('#link_num').html("当前共有PNG图片:&nbsp" + PNG_link_num + "&nbsp&nbsp&nbsp&nbsp" + "非PNG图片:&nbsp" + NOT_PNG_link_num);
}


function autoWork() {
	// TODO: 发一个消息把cookie清空

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

	// 点开所有的图片标签页
	for (var i = fileNum - 1; i >= 0; i--) {
		myqueue.queue([
			function() {
				$("span:contains('查看原件')").click();
				setTimeout(function() {
					myqueue.dequeue();
				}, 500);
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
			// // 从cookie中收集相关信息
			// var file_array = Cookies.get('file_array',{domain:'http://2222.moe/'});
			// console.log(file_array);

			chrome.runtime.sendMessage({
				"action" : "colleLink"
			},function (response) {
				console.log(response);
			});

		}
	]);
	myqueue.dequeue();

}

$('a#button_autowork').click(function() {
	event.preventDefault();
	autoWork();
});
// $('button.OneUp-flipper--next')
// .OneUp-flipper--available

// $("span:contains('查看原件')")