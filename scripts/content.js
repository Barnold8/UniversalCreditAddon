hidden_elements = document.getElementsByClassName('reveal-information')
counter = 0

buttonClass = document.createElement('style')
buttonClass.type = "text/css"
buttonClass.innerHTML = `.button-3 {
    appearance: none;
    background-color: #2ea44f;
    border: 1px solid rgba(27, 31, 35, .15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
  }
  
  .button-3:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }
  
  .button-3:hover {
    background-color: #2c974b;
  }
  
  .button-3:focus {
    box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
    outline: none;
  }
  
  .button-3:disabled {
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, .1);
    color: rgba(255, 255, 255, .8);
    cursor: default;
  }
  
  .button-3:active {
    background-color: #298e46;
    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
  } `


document.getElementsByTagName('head')[0].appendChild(buttonClass)


function getDate(){

    const date = new Date();

    return [date.getDate(),date.getMonth(),date.getFullYear()]

}

for (let item of hidden_elements) {
    
    item.id = counter
    counter++

    button = document.createElement("div") // creating a button in the loop allows each element to have a button? what
    button.innerText = "Add today's date"
    button.className = "button-3"
    button.onclick = function(e){

        date = getDate()

        dateElement = e.target.parentNode.getElementsByClassName("form-date")[0]

        day = dateElement.getElementsByClassName("form-group-day")[0]
        dayInput = day.getElementsByTagName("input")[0]

        month = dateElement.getElementsByClassName("form-group-month")[0]
        monthInput = month.getElementsByTagName("input")[0]

        year = dateElement.getElementsByClassName("form-group-year")[0]
        yearInput = year.getElementsByTagName("input")[0]

        dayInput.value = date[0]
        monthInput.value = date[1] + 1 
        yearInput.value = date[2]

    }

    item.appendChild(button)
}


