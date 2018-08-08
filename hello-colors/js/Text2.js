(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 600,
	fps: 30,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



(lib.Letter5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s("#FFFFFF").p("Am8UaQi5hIhuimQg5hTgphrIg/juQgxkGAAl1QAAj4AxmAIA/jvQAphsA5hTQBuimC5hLQBagnBvgRIDzgWIDyAWQBxARBbAnQBcAkBIA9QBKA+A4BSQBvCmAwEIQAzGAAAD4QgRHMgiCvIg9DuQgpBrg5BTQg4BShKA8QhIA6hcAmQhbAihxARIjyAUQlEgah4gtgAh7tgQgwAngYBrQgZBngHCwIAAN5QAHCwAZBpQAYBpAwAoQAtApBOAAQBNAAAvgpQAwgoAYhpQAXhpAHiwIAAt5QgHiwgXhnQgYhrgwgnQgvgqhNAAQhOAAgtAqg");
	this.shape.setTransform(95.1,137.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,190.1,275.5);


(lib.Letter4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s("#FFFFFF").p("AsEUyMAAAgpjIK3AAMAAAAgsINSAAIAAI3g");
	this.shape.setTransform(77.3,133);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,154.6,266);


(lib.Letter3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s("#FFFFFF").p("AsEUyMAAAgpjIK2AAMAAAAgsINTAAIAAI3g");
	this.shape.setTransform(77.3,133);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,154.6,266);


(lib.Letter2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s("#FFFFFF").p("AskUyMAAAgpjIYmAAIAAI3ItvAAIAAHGIM4AAIAAIfIs4AAIAAIQIOSAAIAAI3g");
	this.shape.setTransform(80.5,133);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,161,266);


(lib.Letter1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s("#FFFFFF").p("ADWUyIAAxHImnAAIAARHIq3AAMAAAgpjIK3AAIAAPQIGnAAIAAvQIKyAAMAAAApjg");
	this.shape.setTransform(90.5,133);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,181,266);


(lib.Hello = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Letter4
	this.letter4 = new lib.Letter4();
	this.letter4.setTransform(649.6,137.8,1,1,0,0,0,77.3,133);

	this.timeline.addTween(cjs.Tween.get(this.letter4).wait(1));

	// Letter3
	this.letter3 = new lib.Letter3();
	this.letter3.setTransform(477.4,137.8,1,1,0,0,0,77.3,133);

	this.timeline.addTween(cjs.Tween.get(this.letter3).wait(1));

	// Letter2
	this.letter2 = new lib.Letter2();
	this.letter2.setTransform(294.3,137.8,1,1,0,0,0,80.5,133);

	this.timeline.addTween(cjs.Tween.get(this.letter2).wait(1));

	// Letter1
	this.letter1 = new lib.Letter1();
	this.letter1.setTransform(90.5,137.8,1,1,0,0,0,90.5,133);

	this.timeline.addTween(cjs.Tween.get(this.letter1).wait(1));

	// letter5
	this.letter5 = new lib.Letter5();
	this.letter5.setTransform(831.8,137.8,1,1,0,0,0,95,137.8);

	this.timeline.addTween(cjs.Tween.get(this.letter5).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("EAregJzIA/jvQAqhsA4hUQBuilC5hLQBbgnBugSIDzgVID0AVQBxASBbAnQBcAkBJA8QBKA/A4BRQBuCnAxEIQAyGAAAD4QgRHMghCvIg+DuQgpBrg4BUQg4BRhKA8QhJA6hcAmQhbAihxASIj0ATQlEgZh4guQi5hJhuikQg4hUgqhrIg/juQgxkGAAl1QAAj4AxmAgEA1/AHCQAICwAZBpQAXBpAxAoQAsApBOAAQBPAAAvgpQAxgoAXhpQAXhpAHiwIAAt5QgHixgXhmQgXhrgxgnQgvgrhPAAQhOAAgsArQgxAngXBrQgZBmgICxgAb30wMAAAAgsINTAAIAAI2I4KAAMAAAgpigAuY0wIAAI2ItxAAIAAHGIM7AAIAAIgIs7AAIAAIQIOUAAIAAI2I5KAAMAAAgpigAA80wMAAAAgsINTAAIAAI2I4HAAMAAAgpigEg9igUwIAAPQIGoAAIAAvQIKzAAMAAAApiIqzAAIAAxGImoAAIAARGIq3AAMAAAgpig");
	this.shape.setTransform(463.5,137.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,929.9,278.5);


// stage content:
(lib.Text2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.hello = new lib.Hello();
	this.hello.setTransform(46.3,156);

	this.timeline.addTween(cjs.Tween.get(this.hello).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(556.8,454.5,929.9,278.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;
