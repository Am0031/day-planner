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

//Utility functions

//Get from local storage
const getFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//Write to local storage
const writeToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

//Remove item from local storage
const removeFromLS = (key) => {
  localStorage.removeItem(key);
  window.location.reload(true);
};

//Clear local storage
const clearLS = () => {
  localStorage.clear();
};

//funtion to render current date in header (moment.js)
const renderDate = () => {
  const currentDate = moment().format("dddd, Do of MMMM YYYY");
  $("#currentDay").append(currentDate);
};

//function to handle click on time blocks remove buttons
const handleRemoveClick = (event) => {
  //stops propagation to other elements in the container
  event.stopPropagation();
  //gets the data-key for the button clicked
  const targetKey = $(event.target).attr("data-key");
  //removes the data-key and its value from local storage
  removeFromLS(targetKey);
};

//function to handle click on time blocks save buttons
const handleSaveClick = (event) => {
  //stops propagation to other elements in the container
  event.stopPropagation();
  //gets the data-key for the button clicked
  const targetKey = $(event.target).attr("data-key");
  //gets the value of the corresponding textarea (textarea with same data-key)
  const taskValue = $(`#task-${targetKey}`).val();
  //sets the data-key and its value in local storage (for data persistence)
  writeToLS(targetKey, taskValue);
};

//function to handle the click on the "clear scheduler" button
const handleClearClick = () => {
  //stops propagation to other elements in the container
  event.stopPropagation();
  //calls function to clear local storage
  clearLS();
  //reloads the page to show that the timeblocks have been cleared
  window.location.reload(true);
};

//function to render the "clear scheduler" button on the page
const renderClearButton = () => {
  //creates and appends the button to the container
  $("#container").append(
    $("<div>")
      .addClass("clear-block d-flex flex-row justify-content-center")
      .attr("id", "clear-btn")
      .append(
        $("<button>")
          .addClass("clearBtn p-2")
          .attr("type", "button")
          .attr("id", "clear-btn")
          .attr("data-key", "all")
          .html("Clear Scheduler")
          //adds event listener on the button
          .click(handleClearClick)
      )
  );
};

//function to render the time blocks on the page
const renderTimeBlock = () => {
  //fetches the current time with moment.js
  const currentTime = parseInt(moment().format("H"));
  console.log(currentTime);

  const renderBlock = (each) => {
    $("#container").append(
      $("<div>")
        .addClass("time-block row d-flex flex-row")
        .attr("id", `time-block-${each.key}`)
        .attr("data-key", `${each.key}`)
        .append(
          $("<p>")
            .addClass("time-area p-2 hour")
            .attr("id", `time-${each.key}`)
            .attr("data-key", `${each.key}`)
            .html(`${each.timeLabel}`),
          $("<textarea>")
            .addClass(`task-area description flex-grow-1 p-2}`)
            .attr("id", `task-${each.key}`)
            .attr("data-key", `${each.key}`)
            .text("")
            .html(""),
          $("<button>")
            .addClass("btn-area saveBtn p-2")
            .attr("type", "button")
            .attr("id", `saveBtn-${each.key}`)
            .attr("data-key", `${each.key}`)
            .html("Save")
            .click(handleSaveClick),
          $("<button>")
            .addClass("btn-area saveBtn p-2")
            .attr("type", "button")
            .attr("id", `removeBtn-${each.key}`)
            .attr("data-key", `${each.key}`)
            .html("Remove")
            .click(handleRemoveClick)
        )
    );

    //Add time related class - with addClass function directly targeting the textarea after its creation
    $(`#task-${each.key}`).addClass(function () {
      if (each.key < currentTime) {
        return "past";
      } else if (each.key === currentTime) {
        return "present";
      } else {
        return "future";
      }
    });

    //Display tasks from local storage in corresponding text areas
    $(`#task-${each.key}`).add(function () {
      const keyLS = each.key.toString();
      console.log(keyLS);
      const taskLS = getFromLS(keyLS);
      console.log(taskLS);
      if (taskLS) {
        $(`#task-${each.key}`).html(taskLS);
      }
    });
  };

  workingHours.forEach(renderBlock);
};

//Main function triggered on load
const renderPlanner = () => {
  renderDate();
  renderClearButton();
  renderTimeBlock();
};

$(window).on("load", renderPlanner);
