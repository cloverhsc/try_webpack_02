// CommonJS style
/*require("./main.css");
var sub = require('./sub');
var $=require('jquery');
var moment = require('moment');
var app = document.createElement('div');
app.innerHTML = '<h1>Hello World </h1>';
app.appendChild(sub());
// document.body.appendChild(app);
$('body').append('<h1>look at me! now is' +moment().format() + '</h1>');*/

// ES2015 style
import './main.scss';
import generateText from './sub';
// import $ from 'jquery';      //這個也不需要了 因為$, jQuery, window.jQuery都可以直接使用了
import './plugin.js';

import moment from 'moment';

let app =document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((number) => {
    $('body').append('<p>promise result is' + number + ' now is' + moment().format()+ '</p>');
    $('p').greenify();
});

app.innerHTML = '<h1>Hello World it</h1>';
document.body.appendChild(app);
app.appendChild(generateText());