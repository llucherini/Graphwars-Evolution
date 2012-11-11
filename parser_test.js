var requirejs = require("requirejs");

requirejs.config({
    nodeRequire: require
});

requirejs(["parser/tokens", "parser/lexer", "parser/parser", "parser/parselets"], function (tokens, lexer, parser, parselets) {
    var lexer = new lexer.Lexer("a-b-c");
    var parser = new parser.Parser(lexer);
    parser.registerPrefix("NAME", new parselets.NameParselet());
    parser.prefix("PLUS");
    parser.prefix("MINUS");

    parser.inflix("PLUS");
    parser.inflix("MINUS");
    parser.inflix("MULT");
    parser.inflix("SUB");
    
    console.log(parser.parseExpression().toString());
});