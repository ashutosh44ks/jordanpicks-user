const dateTimeSetter = (date, time) => {
  let dateWithTime = new Date(date).setHours(
    time.split(":")[0],
    time.split(":")[1]
  );
  let ISO8601 = new Date(dateWithTime).toISOString();
  return ISO8601;
};

export default dateTimeSetter;
