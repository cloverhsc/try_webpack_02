function generateText(){
    var element = document.createElement('h2');
    element.innerHTML = 'Hello h2 world';
    console.log("Clover");
    return element;
}

module.exports = generateText;
