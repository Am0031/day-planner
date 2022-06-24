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

//API calls
const getTasks = async () =>
  await fetch("/api/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

const createTask = async (task) =>
  await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

const editTask = async (task) =>
  //id and data is passed with the currentNote created and passed in
  await fetch(`/api/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
const deleteTask = async (id) =>
  await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
const clearAllTasks = async () =>
  await fetch(`/api/tasks`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
//END API calls

//function to render current date in header (moment.js)
const renderDate = () => {
  const currentDate = moment().format("dddd, Do of MMMM YYYY");
  $("#currentDay").append(currentDate);
};

//function to handle click on remove buttons
const handleRemoveClick = async (event) => {
  //gets the data-key for the button clicked
  const targetKey = parseInt($(event.target).attr("data-key"));
  //removes the data-key and its value from sql database
  await deleteTask(targetKey);
  //re-renders the scheduler
  renderScheduler();
};

//function to handle click on save buttons
const handleSaveClick = async (event) => {
  //gets the data-key for the button clicked
  const targetKey = parseInt($(event.target).attr("data-key"));

  //gets the value of the corresponding textarea (textarea with same data-key)
  const taskValue = $(`textarea[data-key=${targetKey}]`).val();

  //check if task already exists in database
  const allTasks = await (await getTasks()).json();
  const taskExists = allTasks.data.filter((t) => t.timeKey === targetKey);

  //sets the data-key and its value in local storage (for data persistence)
  const newTask = {
    timeKey: targetKey,
    taskText: taskValue,
  };

  taskExists.length !== 0 ? await editTask(newTask) : await createTask(newTask);
};

//function to handle click on the clear button
const handleClearClick = async () => {
  //calls function to clear all tasks
  await clearAllTasks();
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
const renderTimeBlocks = async () => {
  //fetches the current hour with moment.js
  const currentTime = moment().hour();

  const allTasks = await (await getTasks()).json();

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
      //filter the task array from db to find if there's a task for that timeKey
      const taskLS = allTasks.data.filter((t) => t.timeKey === each.key);

      //if the function returns a value, then write this value's text into the html attribute
      if (taskLS.length !== 0) {
        const taskText = taskLS[0].taskText;
        $(`textarea[data-key=${each.key}]`).html(taskText);
      }
    });
  };

  //function - loop that goes through each of the n objects stored in the working hours array and pass it to the renderBlock function
  workingHours.forEach(renderBlock);
};

//renders the different parts of the scheduler - can be re-used to re-render after removing items
const renderScheduler = async () => {
  //empty the container
  $("#container").empty();
  $("#container").unbind("click");
  //render the elements in the container
  renderClearButton();
  renderTimeBlocks();
  //assign the event listener to the container
  $("#container").click(handleClick);
};

//Main function triggered on load
const renderPlanner = async () => {
  //1st step - render date in header
  renderDate();
  //2nd step - render scheduler in div container
  renderScheduler();
};

//instruction on load of page
$(window).on("load", renderPlanner);
