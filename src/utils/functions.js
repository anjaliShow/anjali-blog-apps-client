export const createdTime = (time) => {
  const month = [
    'Jan',
    'Fab',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(time);
  const day = date.getDate();
  const monthName = month[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${day} ${monthName} ${year}`;
};

export const truncate = (content, word) => {
  return content.length > word ? content.substring(0, word) + '...' : content;
};
