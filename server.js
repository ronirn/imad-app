var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

//this line was modified by me
var articleOne = {
	title: "Article | one",
	heading : " Hi",
	content: `The Black Cat' is a short story written by Edgar Allan Poe. Poe was born in 1809, died at the age of 40 in 1849, and was an important contributor to the American Romantic movement. His work has also been described as mystery, macabre, and Gothic.

In addition to writing short stories and poems, Poe also worked as a literary critic. He was married to his cousin for 12 years, until she died of tuberculosis in 1847. Throughout his life, Poe struggled with money. He couldn't afford to go to college, and he gambled and drank excessively.

Poe's short story, 'The Black Cat' was published in 1843 in The Saturday Evening Post. It was popular with readers, but Poe did not receive instant success until he published his famous poem, 'The Raven'. Since its publication, elements of 'The Black Cat' have inspired films, television episodes, paintings, plays, comics, and novels.`
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get("/article-one", function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
