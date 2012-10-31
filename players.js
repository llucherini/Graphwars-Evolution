players = { 
	alive: [{x: 80, y: 40, radius: 10}],
	
	show: function() {
		this.stage = document.getElementById('stage');
		var ctx = this.stage.getContext('2d');
		for (var i = 0; i < this.alive.length; ++i) {
			ctx.beginPath();
			ctx.arc(plotter.axes.x0 + this.alive[i].x, plotter.axes.y0 - this.alive[i].y, this.alive[i].radius, 0, Math.PI*2, true); 
			ctx.closePath();
			ctx.fill();
		}
	}
};
