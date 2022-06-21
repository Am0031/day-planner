//setting up the range of working hours to display in schedule
const workingHours = [
  { timeLabel: "8am", key: 8 },
  { timeLabel: "9am", key: 9 },
  { timeLabel: "10am", key: 10 },
  { timeLabel: "11am", key: 11 },
  { timeLabel: "12pm", key: 12 },
  { timeLabel: "1pm", key: 13 },
  { timeLabel: "2pm", key: 14 },
  { timeLabel: "3pm", key: 15 },
  { timeLabel: "4pm", key: 16 },
  { timeLabel: "5pm", key: 17 },
  { timeLabel: "6pm", key: 18 },
];

//UTILITY FUNCTIONS

//Get from local storage
const getFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//Write to local storage
const writeToLS = (key, data) => {
  if (data !== "") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

//Remove item from local storage
const removeFromLS = (key) => {
  localStorage.removeItem(key);
};

//Clear local storage
const clearLS = () => {
  localStorage.clear();
};

//END UTILITY FUNCTIONS

//function to render current date in header (moment.js)
const renderDate = () => {
  const currentDate = moment().format("dddd, Do of MMMM YYYY");
  $("#currentDay").append(currentDate);
};

//function to handle click on remove buttons
const handleRemoveClick = (event) => {
  //gets the data-key for the button clicked
  const targetKey = $(event.target).attr("data-key");
  //removes the data-key and its value from local storage
  removeFromLS(targetKey);
  //re-renders the scheduler
  renderScheduler();
};

//function to handle click on save buttons
const handleSaveClick = (event) => {
  //gets the data-key for the button clicked
  const targetKey = $(event.target).attr("data-key");
  //gets the value of the corresponding textarea (textarea with same data-key)
  const taskValue = $(`textarea[data-key=${targetKey}]`).val();
  //sets the data-key and its value in local storage (for data persistence)
  writeToLS(targetKey, taskValue);
};

//function to handle click on the clear button
const handleClearClick = () => {
  //calls function to clear local storage
  clearLS();
  //re-renders the scheduler
  renderScheduler();
};

//function to handle a click in the container - redirects to the right handling function
const handleClick = (event) => {
  //stops propagation to other elements in the container
  event.stopPropagation();
  //gets the date purpose to know if a save or remove button was clicked
  const targetPurpose = $(event.target).attr("data-purpose");
  //if remove button was clicked, then goes to the handleRemoveClick function
  if (targetPurpose === "remove") {
    handleRemoveClick(event);
    //if save button was clicked then, goes to the handleSaveClick function
  } else if (targetPurpose === "save") {
    handleSaveClick(event);
  } else if (targetPurpose === "clear") {
    handleClearClick();
  }
};

//function to render the "clear scheduler" button on the page
const renderClearButton = () => {
  //creates and appends the button to the container
  $("#container").append(
    $("<div>")
      .addClass("clear-block d-flex flex-row justify-content-center")
      .append(
        $("<button>")
          .addClass("clearBtn p-2")
          .attr("type", "button")
          .attr("data-purpose", "clear")
          .html("Clear Scheduler")
      )
  );
};

//function to render the time blocks on the page
const renderTimeBlocks = () => {
  //fetches the current hour with moment.js
  const currentTime = moment().hour();

  //creates and append the n time block
  const renderBlock = (each) => {
    $("#container").append(
      $("<div>")
        .addClass("time-block row d-flex flex-row")
        .attr("id", `time-block-${each.key}`)
        .attr("data-key", `${each.key}`)
        .append(
          $("<p>")
            .addClass("time-area text-right p-2 hour")
            .attr("data-key", `${each.key}`)
            .html(`${each.timeLabel}`),
          $("<textarea>")
            .addClass(`task-area description flex-grow-1 p-2}`)
            .attr("data-key", `${each.key}`),
          $("<button>")
            .addClass("btn-area saveBtn p-2")
            .attr("type", "button")
            .attr("data-key", `${each.key}`)
            .attr("data-purpose", "save")
            //add fontawesome info for icon display in button
            .html('<i class="fa-solid fa-floppy-disk"></i>'),
          $("<button>")
            .addClass("btn-area removeBtn p-2")
            .attr("type", "button")
            .attr("data-key", `${each.key}`)
            .attr("data-purpose", "remove")
            .html('<i class="fa-solid fa-trash"></i>')
        )
    );

    //Add time related class to n time block's textarea
    $(`textarea[data-key=${each.key}]`).addClass(() => {
      //compares number stored in n key and current time number
      if (each.key < currentTime) {
        return "past";
      } else if (each.key === currentTime) {
        return "present";
      } else {
        return "future";
      }
    });

    //Display task from local storage in corresponding n text area
    $(`textarea[data-key=${each.key}]`).add(() => {
      //converts key into a string
      const keyLS = each.key.toString();
      //pass the string to the getFromLS function (as local storage stores strings)
      const taskLS = getFromLS(keyLS);
      //if the function returns a value from LS, then writes this value into the html attribute
      if (taskLS) {
        $(`textarea[data-key=${each.key}]`).html(taskLS);
      }
    });
  };

  //function - loop that goes through each of the n objects stored in the working hours array and pass it to the renderBlock function
  workingHours.forEach(renderBlock);
};

//renders the different parts of the scheduler - can be re-used to re-render after removing items
const renderScheduler = () => {
  //empty the container
  $("#container").empty();
  //render the elements in the container
  renderClearButton();
  renderTimeBlocks();
  //assign the event listener to the container
  $("#container").click(handleClick);
};

//Main function triggered on load
const renderPlanner = () => {
  //1st step - render date in header
  renderDate();
  //2nd step - render scheduler in div container
  renderScheduler();
};

//instruction on load of page
$(window).on("load", renderPlanner);
