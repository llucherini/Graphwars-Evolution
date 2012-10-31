plotter = {};


plotter.init = function() {
	this.stage = document.getElementById('stage');
	this.plotting = document.getElementById('plotting');
	if (null == this.stage || !this.stage.getContext || null == this.plotting || !this.plotting.getContext) return;
	
	this.axes = {
		x0: .5 + .5 * this.stage.width, 		// x0 pixels from left to x=0
		y0: .5 + .5 * this.stage.height, 		// y0 pixels from top to y=0
		scale: 40                 			// 40 pixels from x=0 to x=1
	};

    this.showAxes();
};

plotter.checkCollisions = function(x, y) {
	for (var i = 0; i < players.alive.length; ++i) {
		if (Math.abs(x - players.alive[i].x) < players.alive[i].radius &&
			Math.abs(y - players.alive[i].y) < players.alive[i].radius) {
			alert("Busted!");
			players.alive.splice(i, 1);
		}
	}
}

plotter.draw = function(funString, color, thick) {
	var fun = function(x) {
		return eval('Math.' + funString);
	};
	
	plotter.plotting.width = plotter.plotting.width;
	var ctx = this.plotting.getContext("2d");

	var x, y, dx = 3;
	var iMax = Math.round((ctx.canvas.width - this.axes.x0) / dx);
	var iMin = Math.round(-this.axes.x0 / dx);
	
	ctx.beginPath();
	ctx.strokeStyle = color;
	var i = iMin;
	this.plottingInterval = setInterval(function() {
			if (i <= iMax) {
				x = dx * i;
				y = plotter.axes.scale * fun(x / plotter.axes.scale);
				if (i == iMin) {
					ctx.moveTo(plotter.axes.x0 + x, plotter.axes.y0 - y);
				} else {
					ctx.lineTo(plotter.axes.x0 + x, plotter.axes.y0 - y);
				}
				ctx.stroke();
				plotter.checkCollisions(x, y);
				++i;
			} else {
				clearInterval(plotter.plottingInterval);
			}
		}, 1);
};

plotter.showAxes = function() {
	var ctx = this.stage.getContext("2d");
	ctx.beginPath();
	ctx.strokeStyle = "rgb(128,128,128)"; 
	ctx.moveTo(0, this.axes.y0);
	ctx.lineTo(ctx.canvas.width, this.axes.y0);  // X axis
	ctx.moveTo(this.axes.x0, 0);
	ctx.lineTo(this.axes.x0, ctx.canvas.height);  // Y axis
	ctx.stroke();
};