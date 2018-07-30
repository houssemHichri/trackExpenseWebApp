import PropTypes from 'prop-types';
import { kea } from 'kea';

export default kea({
  actions: () => ({
    setExpenses: (expensesTotal, ordredExpenses, loadingExpenses) =>
      ({ expensesTotal, ordredExpenses, loadingExpenses }),
  }),

  reducers: ({ actions }) => ({
    data: [
      {
        expensesTotal: 0,
        ordredExpenses: {},
        loadingExpenses: true,
      },
      PropTypes.number, {
        [actions.setExpenses]: (state, payload) => ({
          ...state,
          expensesTotal: payload.expensesTotal,
          ordredExpenses: payload.ordredExpenses,
          loadingExpenses: payload.loadingExpenses,
        }),
      }],
  }),
});
