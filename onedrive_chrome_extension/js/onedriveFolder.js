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
	$('#tmp_panel').toggleClass('hide');
});

// function autowork_hasNext() {
// 	autowork_count--;
// 	if (autowork_count < 0) {
// 		return false;
// 	} else {
// 		return true;
// 	}
// }

function autoWork() {
	// TODO: 发一个消息把cookie清空


	// @warning 文件名不要出现非法字符
	var exportFileName = ($('.BreadcrumbBar-item:last').html() || alert('文件名读取失败'));

	// 在目录页面获取文件数量
	var fileNum = $('div.List-cell').length;
	// autowork_count = fileNum;

	var myqueue = new myQueue();


	// 从文件菜单进入文件详情
	myqueue.queue([function() {
		$('div.List-cell:first a').click();
		setTimeout(function() {
			myqueue.dequeue();
		}, 1000);
	}])

	for (var i = fileNum; i >= 0; i--) {
		myqueue.queue([
			function() {
				$("span:contains('查看原件')").click();
				setTimeout(function() {
					myqueue.dequeue();
				}, 1000);
			},
			function() {
				$('button.OneUp-flipper--next').click();
				setTimeout(function() {
					myqueue.dequeue();
				}, 100);
			}
		]);
	};

	myqueue.dequeue();

}
// $('button.OneUp-flipper--next')
// .OneUp-flipper--available

// $("span:contains('查看原件')")