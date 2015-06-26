console.log('onedriveFolder.js is init');


$('body').append('<div id="tmp_panel" class="hide"><div id = "tmp_panel_title">' 
	// + '<a href="#" id="button_append_link">点击我增加</a>' 
	+ '<a href="#" id="button_autowork">一键(beta)</a>&nbsp;&nbsp;&nbsp;' 
	+ '<a href="#" id="button_close">显/隐！</a>&nbsp;&nbsp;&nbsp;' 
	+ '<a href="#" id="button_convert">转换！</a></div><span>list:<br /></span>' 
	+ '<span id = "link_num">现在共有: 0</span> ' 
	+ '<div id = "click_hint" style="display:none;">添加成功</div><textarea id="myLinklist"></textarea>' 
	+ '</div>');


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