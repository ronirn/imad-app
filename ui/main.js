// Counter code

var button = document.getElementById("counter");
var counter = 0;

button.onclick = function(){
     
    // make a request to the counter endponit
    
    // capture the response and store it in a variable
     
    //render the variable
    counter += 1;
    
    span.innerHTML = counter.toString();
};