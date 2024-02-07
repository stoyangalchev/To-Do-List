// Function getDate
const getDateRight = (time) => (time < 10 ? `0${time}` : time);

const getDate = () => {
  const date = new Date();
  const nowDate = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
  const day = getDateRight(nowDate.day);
  const month = getDateRight(nowDate.month);

  return `${day}.${month}.${nowDate.year}`;
};

export { getDate };