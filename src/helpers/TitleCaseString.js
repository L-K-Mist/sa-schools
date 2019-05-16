export default words => {
  const wordsArr = words.split(" ");
  return wordsArr.map(word => {
    const lower = word.toLowerCase();

    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
};
