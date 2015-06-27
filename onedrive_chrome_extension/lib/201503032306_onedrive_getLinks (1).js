// javascript: (function() {
// 	var s = document.createElement('script');
// 	s.type = 'text/javascript';
// 	s.src = 'https://code.jquery.com/jquery-2.1.1.min.js';
// 	document.head.insertBefore(s, document.head.firstChild);
// })();
javascript: (function() {
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.src = 'https://cdn.rawgit.com/eligrey/Blob.js/master/Blob.js';
	document.head.insertBefore(s, document.head.firstChild);
})();
javascript: (function() {
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.src = 'https://cdn.rawgit.com/eligrey/FileSaver.js/master/FileSaver.js';
	document.head.insertBefore(s, document.head.firstChild);
})();

$(document).ready(function () {
	
// });

// jQuery(function($) {

	$('body').append('<div id="tmp_panel">' 
		+ '<div id = "tmp_panel_title"><a href="#" id="button_append_link">' 
		+ '点击我增加</a>&nbsp;&nbsp;&nbsp;<a href="#" id="button_close">关掉！</a>' 
		+ '&nbsp;&nbsp;&nbsp;<a href="#" id="button_convert">转换！</a>' 
		+ '<a href="#" id="button_autowork">一键(beta)</a></div><span>list:<br /></span>' 
		+ '<span id = "link_num">现在共有: 0</span> ' 
		+ '<div id = "click_hint" style="display:none;">添加成功</div><textarea id="myLinklist"></textarea>' 
		+ '</div>');

	$('#tmp_panel').css('background', '#f6f6f6')
		.css('position', 'absolute')
		.css('width', '300')
		.css('height', '200')
		.css('z-index', '999')
		// .css('font-size','16px')
		.css('left', '50px')
		.css('top', '50px');

	$('#tmp_panel_title')
		// .css('background','#0071bc');
		.css('border-bottom', '1px black solid')
		.css('padding', '10px 0 10px 5px');


	$("#button_append_link")
		.css("background", "#f6f6f6")
		.css("height", "100%");

	$('#click_hint')
		.css('background', '#0071bc')
		.css('text-align', 'center')
		.css('color', 'white')
		.height('30px')
		.css('padding-top', '10px');


	$("#button_append_link").hover(function() {
		$("#button_append_link").css("background-color", "#");
	}, function() {
		$("#button_append_link").css("background-color", "#f6f6f6");
	});

	$('myLinklist').css('height', '400px');



	// 界面设置部分
	//////////////////////////////////////////////////////////////////////////////////////////////////////


	/**
	 * getOriginLink 查看原始版本
	 * 在这里写获取链接的规则
	 * @return link 查看原始版本的链接 如果没有取到则返回undefined
	 */
	function getOriginLink() {

		var link = ($('span.navLinkText:contains(查看原始版本)').parent().attr('href') || undefined);
		if (undefined == link) {
			alert('没抓取到');
			console.error('没抓取到');
		}
		return link;
	}


	// 将文件切割成xxxx.png的格式方便比较
	function myStringSplit(a) {

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
	function myStringLengthCompare(a, b) {

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

	function myLinkSort(a, b) {

		$equ_a = myStringSplit(a);

		$equ_b = myStringSplit(b);

		console.log("equ_a : " + $equ_a);
		console.log("equ_b : " + $equ_b);

		// 若两个串长度相等，他们可以按照字符串比较了
		if (!myStringLengthCompare($equ_a, $equ_b)) {

			console.log('equ_a,equ_b 长度相等');

			// 把.png 切掉,成10000
			// 因为和 '.' 比较没有意义

			$equ_a = $equ_a.substring($equ_a.indexOf('/') + 1, $equ_a.indexOf('.'));
			$equ_b = $equ_b.substring($equ_b.indexOf('/') + 1, $equ_b.indexOf('.'));


			return $equ_a.localeCompare($equ_b);
		}
		return myStringLengthCompare($equ_a, $equ_b);

		// return ( ( $equ_a == $equ_b ) ? 0 : ( ( $equ_a > $equ_b ) ? 1 : -1 ) );
		// return $equ_a.localeCompare($equ_b);
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

	function updateLinkNum(PNG_link_num, NOT_PNG_link_num) {
		$('#link_num').html("当前共有PNG图片:&nbsp" + PNG_link_num + "&nbsp&nbsp&nbsp&nbsp" + "非PNG图片:&nbsp" + NOT_PNG_link_num);
	}

	$count = 0;
	$linkArray = new Array();
	$NOT_PNG_link = ""; // 存储非PNG的串
	$NOT_PNG_link_num = 0;

	// ‘添加’按钮绑定函数
	$('#button_append_link').bind('click', function() {

		$link = getOriginLink();
		// /// /// /// getlink

		// 将链接最后带的参数去掉
		if ($link != null) {
			$link = $link.substr(0, $link.indexOf('?'));
		}

		if (($count > 0) && ($linkArray[$count - 1] == $link)) {
			alert('this way,输入重复');
			return;
		};

		// 这不是png图片
		if ("png" != getFileType($link).toLowerCase()) {
			$NOT_PNG_link += ($link + "\r\n");
			$NOT_PNG_link_num++;

		}
		// 是PNG图片
		else {
			$linkArray[$count] = $link;
			$count++;

			// 更新textfield
			$linklist = $('#myLinklist').val();
			$linklist = $linklist + $link + '\r\n';
			$('#myLinklist').val($linklist);
		}


		updateLinkNum($count, $NOT_PNG_link_num);

		$('#click_hint').show();
		setTimeout(function() {
			$('#click_hint').fadeToggle("slow");
		}, 500);
	});


	// '转换按钮'绑定函数
	$('#button_convert').bind('click', function() {
		$linkArray.sort(myLinkSort);


		// console.log($linkArray + '\n');
		// $newLinkList = '';
		$('#myLinklist').val($linkArray);
		console.log('一共抓到:' + $linkArray.length);

		// $IMG_GROUP_NUM = 4;
		$IMG_GROUP_NUM = 3;

		if (!($linkArray.length % $IMG_GROUP_NUM)) {
			$groupNum = $linkArray.length / $IMG_GROUP_NUM;

			// xx,s,v
			// xx,s,v,s
			$('#myLinklist').val('');


			// 2014/12/18 13:26
			// 由于现在更改需求，导致一组的数量改变成
			// xx s u v
			// 生成的是
			// xx s u s v s
			// 定义这一组为IMG_GROUP_NUM = 4;

			// 2014/12/21 18:32 换成
			// xx s v
			// 我决定把两个都写上

			// 又出现了 xx a h s
			// xx s h s a s
			for (var i = 0; i < $groupNum; i++) {

				$link = ''; // 最终的link

				// xx s u v
				// xx s h a
				if (4 == $IMG_GROUP_NUM) {
					// 为方便，将各个取出
					$link_xx = $linkArray[i * $IMG_GROUP_NUM];
					$link_s = $linkArray[i * $IMG_GROUP_NUM + 1];
					$link_u = $linkArray[i * $IMG_GROUP_NUM + 2];
					$link_v = $linkArray[i * $IMG_GROUP_NUM + 3];

					// 第一组 xx s
					$link += '[URL=' + $link_xx + '][IMG]' + $link_s + '[/IMG][/URL] ';

					// 第二组 u s
					$link += '[URL=' + $link_v + '][IMG]' + $link_s + '[/IMG][/URL] ';

					// 第三组 v s
					$link += '[URL=' + $link_u + '][IMG]' + $link_s + '[/IMG][/URL]\r\n';
				} else if (3 == $IMG_GROUP_NUM) {
					// 
					// xx s v
					$link_xx = $linkArray[i * $IMG_GROUP_NUM];
					$link_s = $linkArray[i * $IMG_GROUP_NUM + 1];
					$link_v = $linkArray[i * $IMG_GROUP_NUM + 2];

					// 第一组 xx s
					$link += '[URL=' + $link_xx + '][IMG]' + $link_s + '[/IMG][/URL] ';

					// 第二组 v s
					$link += '[URL=' + $link_v + '][IMG]' + $link_s + '[/IMG][/URL]\r\n';
				}



				$linklist = $('#myLinklist').val();
				$linklist = $linklist + $link;
				$('#myLinklist').val($linklist);


			}
			// 放置好所有的PNG图片链接以后，在开头并入所有非PNG图片

			$linklist = $NOT_PNG_link + "\r\n" + $linklist;

			$('#myLinklist').val($linklist);

		} else {
			alert('不是' + $IMG_GROUP_NUM + '的倍数组呢,摊手');
			console.error('不是' + $IMG_GROUP_NUM + '的倍数组呢,摊手');
		}

	});

	// '关闭'按钮绑定
	$('#button_close').bind('click', function() {
		$('#tmp_panel').remove();
	});





	$.fn.drag = function(options) {

		//默认配置
		var defaults = {
			handler: false,
			opacity: 0.5
		};

		// 覆盖默认配置
		var opts = $.extend(defaults, options);

		this.each(function() {

			//初始标记变量
			var isMove = false,
				//handler如果没有设置任何值，则默认为移动对象本身，否则为所设置的handler值
				handler = opts.handler ? $(this).find(opts.handler) : $(this),
				_this = $(this), //移动的对象
				dx, dy;

			$(document)
				//移动鼠标，改变对象位置
				.mousemove(function(event) {
					// console.log(isMove);
					if (isMove) {

						//获得鼠标移动后位置
						var eX = event.pageX,
							eY = event.pageY;

						//更新对象坐标
						_this.css({
							'left': eX - dx,
							'top': eY - dy
						});

					}
				})

			//当放开鼠标，停止拖动
			.mouseup(function() {
				isMove = false;
				_this.fadeTo('fast', 1);
				//console.log(isMove);
			});

			handler
			//当按下鼠标，设置标记变量isMouseDown为true
				.mousedown(function(event) {

				//判断最后触发事件的对象是否是handler
				if ($(event.target).is(handler)) {

					isMove = true;
					$(this).css('cursor', 'move');

					//console.log(isMove);
					_this.fadeTo('fast', opts.opacity);

					//鼠标相对于移动对象的坐标
					dx = event.pageX - parseInt(_this.css("left"));
					dy = event.pageY - parseInt(_this.css("top"));

				}
			});
		});
	};
	//拖动标题
	$("#tmp_panel").drag({
		handler: $('#tmp_panel_title'), //操作拖动的对象，此对象必须是移动对象的子元素
		opacity: 0.7 //设置拖动时透明度
	});

	// 队列做事
	var myQueue = function(fnArr) {
		//将队列放入fnArr
		this.fnArr = fnArr || [];
	};
	myQueue.prototype = {
		fnArr: [],
		queue: function(fn) {
			//如果是函数数组，则依次放入
			if (fn[0]) {
				for (var i = 0; fn[i]; this.fnArr.push(fn[i++])) {}
			} else {
				this.fnArr.push(fn);
			}
		},
		dequeue: function() {
			//弹出剩余的第一个函数并执行
			(this.fnArr.shift() || function() {})();
		},
		clear: function() {
			this.fnArr = [];
		},
		length: function() {
			return this.fnArr.length;
		}
	};

	function autowork_count_selfplus() {
		autowork_count--;
		if (autowork_count < 0) {
			return false;
		} else {
			return true;
		}
	}

	function autowork_count_clear(argument) {
		autowork_count = 0;
	}

	function autowork_getOriginLink() {

		var link = ($('span.navLinkText:contains(查看原始版本)').parent().attr('href') || undefined);
		if (undefined == link) {
			alert('没抓取到');
			console.error('没抓取到');
		}
		// alert(link);
		console.log(link);
		return link;
	}

	function autowork_jmp(file_link) {
		window.location.href = file_link;
	}

	// '一键'绑定

	$('a#button_autowork').click(function() {

		exportFileName = ($('span.setTitle :first-child').html() || alert('文件名读取失败'));
		file_link_array = $('a.file');
		autowork_count = file_link_array.length;
		myqueue = new myQueue();


		while (autowork_count_selfplus()) {
			myqueue.queue([
				function() {
					// 
					autowork_count--;
					autowork_jmp(file_link_array[autowork_count].href);

					// console.log(autowork_count +' : '+ file_link_array[autowork_count].href);
					setTimeout("myqueue.dequeue()", 1500);
				},
				function() {
					$('a#button_append_link').trigger('click');
					setTimeout("myqueue.dequeue()", 100);
				}
			]);
		}
		myqueue.queue([
			// 转换链接
			function () {
				$('a#button_convert').trigger('click');
				setTimeout("myqueue.dequeue()", 1000);
			},
			// 保存文件
			function () {
				var exportText = $linklist;
				exportFileName+=".txt";
				var blob = new Blob([exportText], {type: "text/plain;charset=utf-8"});
				saveAs(blob, exportFileName);
				setTimeout("myqueue.dequeue()", 100);
			}

		]);

		autowork_count = file_link_array.length;

		myqueue.dequeue();
	});

});

// Reference
// (1) http://www.muzilei.com/archives/136
// (2) http://code.jquery.com/jquery-2.1.1.min.js
// (3) https://onedrive.live.com
// (4) http://shawphy.com/2009/04/my-queue.html
// (5) https://github.com/eligrey/FileSaver.js
