import React from 'react';
import axios from 'axios';
import { connect } from 'kea';
import { Header, Segment, List, Message } from 'semantic-ui-react';
import expenses from '../../state/expenses';
import { getKeys, getTotalAmount, devideExpenses } from '../utils';

class ExpensesInfo extends React.Component {
  componentDidMount() {
    const { setExpenses } = this.actions;
    axios.get('/api/v1/approvedExpenses')
      .then((response) => {
        const { expensesTotal, ordredExpenses } = devideExpenses(response.data.expenses);
        setExpenses(expensesTotal, ordredExpenses, false);
      })
      .catch(error => console.log(`api error : /api/v1/expenses ${error}`));
  }

  render() {
    const { data = {} } = this.props;
    const {
      loadingExpenses,
      expensesTotal,
      ordredExpenses,
    } = data;
    const ordredExpensesList = getKeys(ordredExpenses);

    return (
      <Segment loading={loadingExpenses}>
        <Header as="h2">Total expenses : {expensesTotal} EUR</Header>
        {(ordredExpensesList.length !== 0) &&
          ordredExpensesList.map(o => (
            <List selection divided verticalAlign="middle">
              <Header as="h3">{o} expenses : {getTotalAmount(ordredExpenses[o])} EUR</Header>
              {ordredExpenses[o].map(subExpenses => (
                <List.Item>
                  <List.Content>
                    Date: {o} /
                    Amount: {subExpenses.amount} /
                    Claimer: {subExpenses.claimerName} /
                    Description: {subExpenses.description} /
                  </List.Content>
                </List.Item>
              ))}
            </List>
          ))
        }
        {(ordredExpensesList.length === 0) &&
          (
            <Message info>
              <Message.Header>No Expenses found</Message.Header>
            </Message>
          )
        }

      </Segment>
    );
  }
}

export default connect({
  actions: [
    expenses, [
      'setExpenses',
    ],
  ],
  props: [
    expenses, [
      'data',
    ],
  ],
})(ExpensesInfo);
