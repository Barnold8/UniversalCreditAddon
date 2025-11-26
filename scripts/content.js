// BUTTON DEFINITION
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
// BUTTON DEFINITION

class Job{

  constructor(heading,application_date,type,note="",interview_time=0){

    let job_heading = heading.split("-")
    let date = application_date.split("on ")

    this.job_title = job_heading[0]
    this.company_name = job_heading[1]
    this.application_date = date[1]

    this.job_title = this.job_title.trim()
    this.company_name = this.company_name .trim()
    this.application_date = this.application_date.trim()

    this.job_title = this.job_title.replaceAll(","," ")
    this.company_name = this.company_name.replaceAll(","," ")
    this.application_date = this.application_date.replaceAll(","," ")

    this.job_type = type
    this.note = note

    if(this.job_type === "Going for an interview"){

      interview_time = Number(interview_time.toString().split(" ")[0])

      let interviewDate = getInterviewDate(interview_time)
      interviewDate =  interview_time > 0 ? `Date of interview is ${interviewDate.toDateString()}` : "The interview has already happened"; 

      if(this.note.toString().includes("N/A")){
        this.note = interviewDate
      }else{
        this.note += ` | ${interviewDate}`
      }

    }

    this.note = this.note.replace(/(\r\n|\n|\r)/gm, "");
    this.note = this.note.trim()
  }

}



function getInterviewDate(days){

  let interviewDate = new Date()
  interviewDate.setDate(interviewDate.getDate()+days)

  return interviewDate

}

async function getPage(URL){

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.text()
  
  } catch (error) {
    console.error(error.message);
    return null
  }

}

function getDate(){

    const date = new Date();

    return [date.getDate(),date.getMonth(),date.getFullYear()]

}

function downloadCSV(csv){ 
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = 'download.csv';

  a.click();
}

function generateCSV(jobs){

  csvData = "Job title," + "Company Name," + "Application Date," + "Type," + "Notes\n"

  for(let job of jobs){
    //console.log(job)
    csvData += job.job_title + ","
    csvData += job.company_name + ","
    csvData += job.application_date + ","
    csvData += job.job_type + ","
    csvData += job.note + ","
    csvData += "\n"

  }

  return csvData
}



function grabJobs(doc){

  jobs = doc.getElementsByClassName("job-list__item")
  jobs_data = []


  for(let job of jobs){

    jobLogType = job.getElementsByClassName("job-list__status-label") // Says whether user applied, is interesed, has interview etc
    jobNotes = job.getElementsByClassName("job-list__item-notes")
    daysTillInterview = job.getElementsByClassName("job-list__status-text")

    daysTillInterview = daysTillInterview[0].innerText.split("in ")[1]

    if(jobNotes.length == 1){
      jobNotes = jobNotes[0].innerText
    }else{
      jobNotes = "N/A" 
    }


    _job = new Job(
      job.getElementsByClassName("job-list__item-heading")[0].innerText,
      job.getElementsByClassName("job-list__item-date")[0].innerText,
      jobLogType[0].innerText,
      jobNotes,
      daysTillInterview,

    )
    jobs_data.push(_job)

  }
  return jobs_data
}

async function getPages(doc, array) {
  if (doc.getElementsByClassName("job-list__item").length <= 0) { 
    return array
  }

  array.push(doc)

  let pageList = doc.getElementsByClassName("pagination__list")
  if (pageList.length === 0) {
    return array
  }

  pageList = pageList[0].children
  let possibleNext = pageList[pageList.length - 1]
  let possibleNextLink = possibleNext.getElementsByTagName("a")

  if (possibleNextLink.length > 0 && possibleNextLink[0].innerText.includes("Next")) {
  
    try {
      let result = await getPage(possibleNextLink[0].href)
      if (!result) {
        return array
      }

      const parser = new DOMParser();
      let dom = parser.parseFromString(result, "text/html")

      return getPages(dom, array)
    } catch (error) {
      return array
    }
  } else {
    return array
  }
}

if(document.URL.includes("job")){ // Add "Add today's date" button to job logging fields
  
  //console.log("Hello again")
  //reveal-information
  hidden_elements = document.getElementsByClassName('date-group')
  counter = 0
  
  for (let item of hidden_elements) {
    
    item.id = counter
    counter++

    item.appendChild(document.createElement("br"))

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



}else if(document.URL.includes("https://www.universal-credit.service.gov.uk/work-search")){ // Add the generate csv button so the user can generate a csv on the jobs theyve logged
  
  button = document.createElement("div") // creating a button in the loop allows each element to have a button? what
  button.innerText = "Generate CSV"
  button.className = "button-3"
  button.onclick = function(e){

    pageContents = getPages(document,[])

    pageContents.then(result => {
      let jobs = []
      for(let document of result){
        
        jobs.push(grabJobs(document))
      }
      jobs = jobs.flat()      
      downloadCSV(generateCSV(jobs))
    })

  }

  document.getElementsByTagName("main")[0].appendChild(button)
  
}



