input = {};

input.init = function() {
	this.textbox = document.getElementById('function');
};

input.send = function(evt) {
	if (input.validate(this.textbox.value)) {
		plotter.draw(this.textbox.value, "rgb(11,153,11)", 0.5);
	}

};

input.validate = function(fun) {
	// pass
	return true;
};

input.wrap = function(evt) {
	var selection;
        
	if (window.getSelection) {
		selection = window.getSelection();
	} else if (document.selection) {
		selection = document.selection.createRange();
	}
	
	alert(selection.toString());
	
	// modify content of the selection accordingly.
};

window.onload = function() {
	input.init();
	plotter.init();
	players.show();
};