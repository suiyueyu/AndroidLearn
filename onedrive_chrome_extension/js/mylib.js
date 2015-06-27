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