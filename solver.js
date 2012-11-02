solver = {};

solver.Variable = function() {
    return {
	"solve" : function(x) { return x; },
	"toString" : function() { return "x"; }
    }
}

solver.Constant = function(value) {
    return {
	"solve" : function(x) { return value; },
	"toString" : function() { return value; }
    }
}

solver.Add = function(term1, term2) {
    return {
	"solve" : function(x) { return term1.solve(x) + term2.solve(x); },
	"toString" : function() { return "(" + term1.toString() + " + " + term2.toString() + ")"; }
    }
}

solver.Sub = function(term1, term2) {
    return {
	"solve" : function(x) { return term1.solve(x) - term2.solve(x); },
	"toString" : function(x) { return "(" + term1.toString() + " - " + term2.toString() + ")"; }
    }
}

solver.Mul = function(term1, term2) {
    return {
	"solve" : function(x) { return term1.solve(x) * term2.solve(x); },
	"toString" : function() { return "(" + term1.toString() + " * " + term2.toString() + ")"; }
    }
}

solver.Div = function(term1, term2) {
    return {
	"solve" : function(x) { return term1.solve(x) / term2.solve(x); },
	"toString" : function() { return "(" + term1.toString() + " / " + term2.toString() + ")"; }
    }
}

solver.Pow = function(base, exponent) {
    return {
	"solve" : function(x) { return Math.pow(base.solve(x), exponent.solve(x)); },
	"toString" : function() { return base.toString() + " ^ " + exponent.toString(); }
    }
}

solver.Sqrt = function(term) {
    return {
	"solve" : function(x) { return Math.sqrt(term.solve(x)); },
	"toString" : function() { return "sqrt(" + term.toString() + ")"; }
    }
}

solver.Exp = function(term) {
    return {
	"solve" : function(x) { return Math.exp(term.solve(x)); },
	"toString" : function() { return "e^" + term.toString(); }
    }
}

solver.Ln = function(term) {
    return {
	"solve" : function(x) { return Math.log(term.solve(x)); },
	"toString" : function() { return "ln(" + term.toString() + ")"; }
    }
}

solver.Log = function(base, term) {
    return {
	"solve" : function(x) { return Math.log(term.solve(x)) / Math.log(base.solve(x)); },
	"toString" : function() { return "log(" + base.toString(), + ", " + term.toString() + ")"; }
    }
}

solver.Sin = function(term) {
    return {
	"solve" : function(x) { return Math.sin(term.solve(x)); },
	"toString" : function() { return "sin(" + term.toString() + ")"; }
    }
}

solver.Cos = function(term) {
    return {
	"solve" : function(x) { return Math.cos(term.solve(x)); },
	"toString" : function() { return "cos(" + term.toString() + ")"; }
    }
}



/* Tests */

function Squared(term) {
    return solver.Pow(term, solver.Constant(2));
}

function pythagoreanTheorem(side1, side2) {
    return solver.Sqrt(solver.Add(Squared(solver.Constant(side1)), Squared(solver.Constant(side2))));
}

expr = pythagoreanTheorem(2,3)

console.log(expr.toString())
console.log(expr.solve(null))