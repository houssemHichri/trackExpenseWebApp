
export const devideExpenses = (expenses) => {
  let expensesTotal = 0;
  const ordredExpenses = {};
  expenses.forEach((r) => {
    const month = new Date(r.expenseDate).getMonth();
    const year = new Date(r.expenseDate).getFullYear();
    const tabKey = `${month + 1}/${year}`;
    if (!ordredExpenses[tabKey]) {
      ordredExpenses[tabKey] = [];
    }
    ordredExpenses[tabKey].push(r);
    expensesTotal += r.amount;
  });
  return ({
    expensesTotal,
    ordredExpenses,
  });
};

export const getKeys = data => Object.keys(data);

export const getTotalAmount = (data) => {
  let expensesTotal = 0;
  data.forEach((r) => {
    expensesTotal += r.amount;
  });
  return expensesTotal;
};
