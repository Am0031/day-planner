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

const getFromLS = () => {
  console.log("getting info from LS");
};
const renderDate = () => {
  const currentDate = moment().format("dddd, Do of MMMM YYYY");
  $("#currentDay").append(currentDate);
};

const renderTimeBlock = () => {
  const renderBlock = () => {
    const currentTime = moment().format("H");
    console.log(currentTime);
  };
  workingHours.forEach(renderBlock);
};

const renderPlanner = () => {
  getFromLS();
  renderDate();
  renderTimeBlock();
};

$(window).on("load", renderPlanner);
