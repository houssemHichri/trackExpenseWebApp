import React from 'react';
import axios from 'axios';
import { Header, Segment, Button, List, Message } from 'semantic-ui-react';
import { Link } from 'react-router';
import { employees } from '../../db/json';
import { JsonForm } from '../components/Generic';
import { devideExpenses, getKeys, getTotalAmount } from './utils';




class Home extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      loadingClaimers : true,
      loadingExpenses : true,
      claimers: [],
      expenses: [],
      ordredExpenses: [],
    };
  }

  componentDidMount() {
    this.refetchClaimers();
  }

  fetchExpenses = () => {
    axios.get('/api/v1/approvedExpenses')
      .then((response) => {
        const { expensesTotal, ordredExpenses } = devideExpenses(response.data.expenses);
        this.setState({
          expensesTotal,
          ordredExpenses,
          loadingExpenses: false,
        });
      })
      .catch(error => console.log(`api error : /api/v1/expenses ${error}`));
  }

  handelSubmitForm = (apiInput) => {
    axios.post('/api/v1/employees', apiInput)
      .then(response => this.refetchClaimers())
      .catch(error => console.log);
  };

  refetchClaimers = () => {
    axios.get('/api/v1/employees')
      .then(response => this.setState({
        claimers: response.data.claimers,
        loadingClaimers: false,
      }))
      .catch(error => console.log(`api error : /api/v1/expenses ${error}`));
    this.fetchExpenses();
  }

  render() {
    const {
      loadingClaimers,
      loadingExpenses,
      claimers,
      expensesTotal,
      ordredExpenses,
    } = this.state;

    const ordredExpensesList = getKeys(ordredExpenses);

    return (
      <Segment>
        <Header as="h1">Track Expense Claims</Header>
        <JsonForm
          header="Add Employees"
          withSubmit
          handelSubmitForm={this.handelSubmitForm}
          data={employees}
          mode="add"
        />
        <Header as="h1">Expenses Total</Header>
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
        <Header as="h1">Claimers List</Header>
        <Segment loading={loadingClaimers}>
          <List selection divided verticalAlign="middle">
            {(claimers.length !== 0) &&
              claimers.map(c => (
                <List.Item>
                  <List.Content floated="right">
                    <Button><a href={`/expensesAdd/${c._id}`}>Claim expense</a></Button>
                  </List.Content>
                  <List.Content>{c.lastName} {c.firstName}</List.Content>
                </List.Item>
              ))
            }
            {(claimers.length === 0) &&
              (
                <Message info>
                  <Message.Header>No Claimers found</Message.Header>
                  <p>Add Employees</p>
                </Message>
              )
            }
          </List>
        </Segment>
      </Segment>
    );
  }
}

export default Home;
