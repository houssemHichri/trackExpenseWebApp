import React from 'react';
import axios from 'axios';
import { Button, List, Header, Segment, Message } from 'semantic-ui-react';

class ExpensesList extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      loading: true,
      expenses: [],
    };
  }
  componentDidMount() {
    this.fetchExpenses();
  }

  fetchExpenses = () => {
    axios.get('/api/v1/expenses')
      .then(response => this.setState({
        expenses: response.data.expenses,
        loading: false,
      }))
      .catch(error => console.log(`api error : /api/v1/expenses ${error}`));
  }

  handleDelete = (id) => {
    axios.delete(`/api/v1/expenses/${id}`)
      .then(() => this.fetchExpenses())
      .catch(error => console.log(`api error : /api/v1/expenses ${error}`));
  }
  handleApprovement = (id) => {
    axios.put(`/api/v1/expenses/approve/${id}`)
      .then(() => this.fetchExpenses())
      .catch(error => console.log(`api error : /api/v1/expenses ${error}`));
  }
  render() {
    const { loading, expenses } = this.state;
    return (
      <Segment loading={loading}>
        <Header as="h1">Track Expense Claims</Header>
        <List selection divided verticalAlign="middle">
          {(expenses.length !== 0) &&
            expenses.map(c => (
              <List.Item>
                <List.Content floated="right">
                  <Button
                    color={c.approved ? 'red' : 'green'}
                    onClick={() => this.handleApprovement(c._id)}
                  >{c.approved ? 'Disapprove' : 'Approve'}
                  </Button>
                  <Button onClick={() => this.handleDelete(c._id)}>Delete</Button>
                  <Button><a href={`/expensesEdit/${c.claimerId}/${c._id}`}>Edit</a></Button>
                </List.Content>
                <List.Content>Claimer: {c.claimerName} / Amount: {c.amount} / Date: {c.expenseDate} / Description: {c.description}</List.Content>
              </List.Item>
            ))
          }
          {(expenses.length === 0) &&
            (
              <Message info>
                <Message.Header>No expenses calimed yet</Message.Header>
                <p>Add Employees and let them claim</p>
              </Message>
            )
          }
        </List>
      </Segment>
    );
  }
}

export default ExpensesList;
