export const saveToStorage = (key, value) => new Promise(() => {
  localStorage.setItem(key, JSON.stringify(value));
});

export const getFromStorage = async key => Promise.resolve(JSON.parse(localStorage.getItem(key)));
