define(["./tokens"], function (tokens) {
    return {
	Lexer: function (text) {
	    var index = 0;
	    
	    this.next = function() {
		while(index < text.length) {
		    var c = text[index++];
		    
		    if(c in tokens) {
			return { type:  tokens[c], 
				 text: c
			       };
		    } else if(c.match(/[a-zA-Z0-9.]/)) {
			var start = index-1;
			while(index < text.length) {
			    c = text[index];
			    if(!c.match(/[a-zA-Z0-9.]/) || c in tokens) break;
			    
			    index++;
			}
			var token = text.substring(start, index);
			
			if (token.match(/[0-9.]+/))
 {
			    return {
				type: "CONSTANT",
				text: token
			    }
			} else if (token in tokens) {
			    return {
				type: tokens[token],
				text: token
			    }
			} else {
			    return {
				type: "NAME",
				text: token
			    }
			}
		    } else {
			// Ignore anything not recognised.
		    }
		}
		
		return { type:  "EOF", 
			 text: ""};
	    }
	}
    }
});