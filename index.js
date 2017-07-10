var express = require('express');
var app = express();
var news_scrapper = require('./lib/cyber-news-scrapper');

app.all('*', function (req, res, next) {
    var origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
    res.header('Access-Control-Expose-Headers', 'Authorization')
    return next();
});


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function (request, response) {
    response.render('pages/index');
});

app.get('/news', function (request, response) {
    news_scrapper.getNews().then((news) => {
        response.send(news)
    })
});
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


