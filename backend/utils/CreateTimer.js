function CreateTimer(timing) {
  const { day, month, year, hours, minutes, convention } = timing;

  const currentDate = new Date(Date.now());

  if (
    day < currentDate.getDate() ||
    month - 1 < currentDate.getMonth() ||
    year < currentDate.getFullYear()
  ) {
    return null;
  }

  let dateObj = new Date();

  dateObj.setDate(day);
  dateObj.setMonth(month - 1);
  dateObj.setFullYear(year);

  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);
  dateObj.setSeconds(0);

  // setting convention
  if (convention === "PM" && hours !== 12) {
    dateObj.setHours(dateObj.getHours() + 12);
  }

  return dateObj.toString();
}

module.exports = CreateTimer;
