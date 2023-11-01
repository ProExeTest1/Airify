export const getDate = () => {
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let Array = [];
  for (let i = 0; i < 10; i++) {
    let todayDate = Date?.now();
    let milliseconds = 86400000 * i;
    let getCurntDate = new Date(todayDate + milliseconds);
    Array = [
      ...Array,
      {
        day: days[getCurntDate.getDay()],
        date: getCurntDate.toLocaleDateString('en-IN'),
      },
    ];
  }
  return Array;
};
