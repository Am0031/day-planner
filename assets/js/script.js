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

//Getting task value from local storage to return it for display in text area
const getFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//Write to local storage when text is entered in textarea and saved by user
const writeToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const renderDate = () => {
  const currentDate = moment().format("dddd, Do of MMMM YYYY");
  $("#currentDay").append(currentDate);
};

const handleSaveClick = (event) => {
  event.stopPropagation();
  const targetKey = $(event.target).attr("data-key");
  console.log(targetKey);

  const taskValue = $(`#task-${targetKey}`).val();
  console.log(taskValue);

  writeToLS(targetKey, taskValue);
};

const handleClearClick = () => {
  console.log("LS clear start");
  localStorage.clear();
  console.log("LS clear end");
  window.location.reload(true);
};
const renderClearButton = () => {
  $("#container").append(
    $("<div>")
      .addClass("clear-block row d-flex flex-row")
      .attr("id", "clear-btn")
      .append(
        $("<button>")
          .addClass("clearBtn p-2")
          .attr("type", "button")
          .attr("id", "clear-btn")
          .attr("data-key", "all")
          .html("Clear Scheduler")
          .click(handleClearClick)
      )
  );
};

const renderTimeBlock = () => {
  //METHOD 1 - with variable to get the appropriate class, then assign the additional class when rendering  -> need to add ${getHourClass(each)} in textarea addClass line
  // const getHourClass = (each) => {
  //   const currentTime = moment().format("H");
  //   let hourClass = "";
  //   if (each.key < currentTime) {
  //     hourClass = "past";
  //   } else if (each.key === currentTime) {
  //     hourClass = "present";
  //   } else {
  //     hourClass = "future";
  //   }
  //   return hourClass;
  // };

  const currentTime = 17; //moment().format("H");

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
            .attr("id", `btn-${each.key}`)
            .attr("data-key", `${each.key}`)
            .html("Save")
            .click(handleSaveClick)
        )
    );

    //METHOD 2 - with each function targeting the textarea after its creation
    // $(`#task-${each.key}`).each(function () {
    //   if (each.key < currentTime) {
    //     $(`#task-${each.key}`).addClass("past");
    //   } else if (each.key === currentTime) {
    //     $(`#task-${each.key}`).addClass("present");
    //   } else {
    //     $(`#task-${each.key}`).addClass("future");
    //   }
    // });

    //METHOD 3 - with addClass function directly targeting the textarea after its creation
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

const renderPlanner = () => {
  renderDate();
  renderClearButton();
  renderTimeBlock();
};

$(window).on("load", renderPlanner);
