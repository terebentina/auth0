const lang = {
  MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dd: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
  ll: 'MMM D YYYY',
};

function zeroPad(num) {
  return (`0${num}`).slice(-2);
}

export default function formatDate(date, str) {
  if (!date) {
    return null;
  }
  if (!(date instanceof Date)) {
    // eslint-disable-next-line no-param-reassign
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dow = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return str
    .replace('ll', lang.ll)
    .replace('YYYY', year)
    .replace('DD', zeroPad(day))
    // D has to come before MMM because 'Dec' contains D and 'Dec' would look like '6ec'
    .replace('D', day)
    .replace('MMM', lang.MMM[month])
    .replace('MM', zeroPad(month + 1))
    .replace('ddd', lang.ddd[dow])
    .replace('dd', lang.dd[dow])
    .replace('HH', zeroPad(hour))
    .replace('H', hour)
    .replace('mm', zeroPad(minute))
    .replace('m', minute)
    .replace('ss', zeroPad(second));
}
