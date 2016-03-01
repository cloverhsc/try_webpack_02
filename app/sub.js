// CommonJS style
/*function generateText(){
    var element = document.createElement('h2');
    element.innerHTML = 'Hello h2 world';
    return element;
}

module.exports = generateText;*/

// ES2015 style
export default function(){
    var element = document.createElement('h2');
    element.innerHTML = "Hello h2 world hahaha";
    return element;
}