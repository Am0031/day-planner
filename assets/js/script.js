const renderDate = () => {
  const currentDate = moment().format("Do of MMMM YYYY");
  $("#currentDay").append(currentDate);
};

$(window).on("load", renderDate);
