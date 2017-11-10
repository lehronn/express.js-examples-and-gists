//import modułów
var express = require('express');
//przypisanie aplikacji do zmiennej która na koniec będzie nasłuchiwać.
var app = express();

//ustalenie domyślnego generatora szablonów.
app.set('view engine', 'pug');  //kreator widoków.
app.set('views','./views');     //widoki będą w katalogu /views

app.get('/', function (req, res) {
    res.send('Hello world!');
});

app.use('/store', function(req, res, next){
    console.log('Jestem pośrednikiem przy żądaniu do /store');
    next();
});

app.get('/store', function (req, res) {
    res.send('To jest sklep');
});

//na tej stronie będzie przekazana wartość zmiennych name i url.
app.get('/dynamic-view', function(req, res){
    res.render('dynamic', {
        name: "Moja dynamiczna strona",
        url: "http://www.google.com",
        user: { name: "Johnny", age: "20" }
    });
});

app.get('/first-template', function(req, res) {
  res.render('first-template');
});

//prezentacja jak wygląda includowanie pugów wewnątrz siebie:
app.get('/includingPugs', function(req, res) {
  res.render('main');
});

//nasłuchiwanie na porcie i obsługa błędu 404.
app.listen(3000);
app.use(function (req, res, next) {
    res.status(404).send('404. Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});