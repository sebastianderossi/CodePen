(function () {

	function CursorClick(stage) {
		this.Container_constructor();

		this.init(stage);
	}

	var p = createjs.extend(CursorClick, createjs.Container);
	var cursor = null;
	var count = 0;
	var limit = 2;
	var finger = null;
	var light = null;
	var _stage = null;
	var message = null;

	p.init = function (clip) {
		this.count = 0;
		this.limit = 2;
		this._stage = clip;
		var comp = AdobeAn.getComposition("F64ADEB5EA424965930973EF4FCD841A");
		var lib = comp.getLibrary();
		this.cursor = new lib.InteractionIndicator();
		this.finger = this.cursor.finger;
		this.light = this.finger.light;
		this.finger.on("animationEnd", this.handleAnimationEnd, this);
		this.finger.stop();

		var overlay = new createjs.Shape();
		overlay.graphics.f(createjs.Graphics.getHSL(0,0, 0,0.75)).dr(0, 0, this._stage.canvas.width, this._stage.canvas.height);
		overlay.cache(0, 0, this._stage.canvas.width, this._stage.canvas.height);

		this.addChild(overlay, this.cursor);

		this.finger.alpha = 0;

		this.finger.scaleX = this.finger.scaleY = 0.5;

		this.finger.y = this._stage.canvas.height >> 1;

		this.message = new createjs.Text();
		this.message.text = "Click to re-draw";
		this.message.font = "30px Arial";
		this.message.color = "#FFFFFF";
		this.addChild(this.message);

		var _this = this;
		createjs.Tween.get(this.finger, {override:true, onChange:function () {
			_this.message.x = _this.finger.x + -_this.message.getMeasuredWidth()/2;
			_this.message.y = _this.finger.y + (_this.message.getMeasuredHeight()*2.5)//*this.finger.scaleY;
			_this.message.alpha = _this.finger.alpha;
		}}).to({x:this._stage.canvas.width>>1, alpha:1}, 500).call(function () {
			_this.show();
		})
	};

	p.handleAnimationEnd = function () {
		if (++this.count == this.limit) {
			this.finger.stop();
			var _this = this;
			createjs.Tween.get(this.light).to({alpha:0}, 1000).wait(500).call(function () {
				_this.handleComplete();
			});
		}
	};

	p.handleComplete = function () {
		var _this = this;
		console.log(this, this.message);
		createjs.Tween.get(this.finger,{override:true, onChange:function () {
					_this.message.x = _this.finger.x + -_this.message.getMeasuredWidth()/2;
					_this.message.y = _this.finger.y + _this.message.getMeasuredHeight()*2.5;
					_this.message.alpha = _this.finger.alpha;
				}}).to({x:this._stage.canvas.width, alpha:0}, 500).call(function () {
			_this.dispatchEvent("animationComplete");
		})
	}

	p.reset = function () {
		this.light.alpha = 1;
	};

	p.show = function () {
		createjs.Tween.get(this).wait(500).call(function () {
			this.finger.play();
		});
	};

	window.CursorClick = createjs.promote(CursorClick, "Container");
}());
