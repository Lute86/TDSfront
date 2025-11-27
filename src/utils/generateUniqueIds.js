export const generateUniqueIds = (count) => {
  const ids = new Set();

  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * 150) + 1);
  }

  return Array.from(ids);
};
