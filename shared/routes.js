import { ExpensesList, Home, ExpensesManager } from './../src/pages';

const routes = [
  {
    path: '/',
    exact: true,
    Component: Home,
  },
  {
    path: '/expenses',
    exact: true,
    Component: ExpensesList,
  },
  {
    path: '/expensesAdd/:target',
    exact: true,
    Component: ExpensesManager,
  },
  {
    path: '/expensesEdit/:target/:exTarget',
    exact: true,
    Component: ExpensesManager,
  },
];

export default routes;
