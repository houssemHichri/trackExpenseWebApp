
export const filterFields = (data) => {
  let newData = {};
  Object.keys(data).forEach((d) => {
    if (data[d].showForm) {
      newData = { ...newData, [d]: data[d] };
    }
  });
  return newData;
};

export const getKeys = data => Object.keys(filterFields(data));
