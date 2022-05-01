# day-planner

General notes:

Add event for each hour of the day?
How many hours do we want? (9AM-5PM)
Use jQuery
Can use Bootstrap
Use moment js https://cdnjs.com/libraries/moment.js
ONLY FOR THE CURRENT DAY

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.3/moment.min.js" integrity="sha512-x/vqovXY/Q4b+rNjgiheBsA/vbWA3IVvsS8lkQSX1gQ4ggSJx38oI2vREZXpTzhAv6tNUaX81E7QBBzkpDQayA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

User Journey

- On page load the current day should be displayed on the page (Friday, 29th April, 2022)
- Use moment js format method to format your date
  https://momentjs.com/docs/#/displaying/format/

- On page load all working hours timeblocks should render

- As a user when I type in the event for a specific time and click on the save button for that time then the event is stored in LS

Timeblock

- label (2PM or 14:00 or 14)
- textarea for your notes
- button to save the note in LS
- colour coded (past: grey | present: red | future: green)

When the user loads the page get the current hour using moment js
For each time block when you create the timeblock compare the hour with the current hour
