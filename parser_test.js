var requirejs = require("requirejs");

requirejs.config({
    nodeRequire: require
});

requirejs(["parser/MathParser"], function (MathParser) {
    var parser = new MathParser();
    
    console.log(parser.parse("a(b+a-d*(a/b))").toString());
});