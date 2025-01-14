hidden_elements = document.getElementsByClassName('reveal-information')
counter = 0

for (let item of hidden_elements) {
    
    item.id = counter
    counter++

    button = document.createElement("div") // creating a button in the loop allows each element to have a button? what
    button.innerText = "Add today's date"

    button.onclick = function(e){

        dateElement = e.target.parentNode.getElementsByClassName("form-date")[0]

        day = dateElement.getElementsByClassName("form-group-day")[0]
        dayInput = day.getElementsByTagName("input")[0]

        month = dateElement.getElementsByClassName("form-group-month")[0]
        monthInput = month.getElementsByTagName("input")[0]

        year = dateElement.getElementsByClassName("form-group-year")[0]
        yearInput = year.getElementsByTagName("input")[0]

        dayInput.value = 1
        monthInput.value = 2
        yearInput.value = 3 

    }

    item.appendChild(button)
}

// document.getElementsByClassName('reveal-information')[0].appendChild(button)

// console.log(document.querySelectorAll('[type="radio"]')[0])
// document.querySelectorAll('[type="radio"]')[0].onclick = function(){alert("Clicked!")}
// console.log(document.querySelectorAll('[type="radio"]')[0].checked)