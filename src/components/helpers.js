const dir = Object.create(null);
dir.LEFT = -1;
dir.RIGHT = 1;

const calculatePoints = rowCount => {
  let result = 0;
  for (let i = rowCount; i > 0; i--) {
    result += i * 10;
  }
  return result;
};

export { dir as directions, calculatePoints };
