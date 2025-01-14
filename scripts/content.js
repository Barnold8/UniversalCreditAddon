hidden_elements = document.getElementsByClassName('reveal-information')
counter = 0

function getDate(){

    const date = new Date();

    return [date.getDate(),date.getMonth(),date.getFullYear()]

}


for (let item of hidden_elements) {
    
    item.id = counter
    counter++

    button = document.createElement("div") // creating a button in the loop allows each element to have a button? what
    button.innerText = "Add today's date"

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

// document.getElementsByClassName('reveal-information')[0].appendChild(button)

// console.log(document.querySelectorAll('[type="radio"]')[0])
// document.querySelectorAll('[type="radio"]')[0].onclick = function(){alert("Clicked!")}
// console.log(document.querySelectorAll('[type="radio"]')[0].checked)