function highlight(text)
{
    inputText = document.getElementById("inputText")
    var innerHTML = inputText.innerHTML
    var index = innerHTML.indexOf(text);
     	console.log(index);
        innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML 
}