var express = require('express');
var routes = require('./routes.js');
var http = require('http');
var compass = require('node-compass');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('i2wCookie'));
app.use(express.session());
app.use(app.router);

app.use(compass({
    mode: 'expanded',
    comments: true,
    relative: true,
    css: 'css',
    sass: 'sass',
    project: 'public',
    cache: 'true',
    loggin: true
}));
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

// Enable livereload
var livereload = require('./livereload.js');
