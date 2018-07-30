import React from 'react';
import axios from 'axios';
import { connect } from 'kea';
import { Header, Grid, Segment, List, Button, Message } from 'semantic-ui-react';
import claimers from '../../state/claimers';
import { JsonForm } from '../Generic';
import { employees } from '../../../db/json';

class UserManager extends React.Component {
  componentDidMount() {
    this.refetchClaimers();
  }

  refetchClaimers = () => {
    const { setClaimers } = this.actions;
    axios.get('/api/v1/employees')
      .then(response => setClaimers(response.data.claimers, false));
  }

  render() {
    const { data: { loadingClaimers, claimers } } = this.props;
    console.log(loadingClaimers);
    console.log(claimers);
    return (
      <Grid.Row columns={2}>
        <Grid.Column>
          <Header as="h1">Track Expense Claims</Header>
          <JsonForm
            header="Add Employees"
            withSubmit
            handelSubmitForm={(apiInput) => {
              axios.post('/api/v1/employees', apiInput)
                .then(() => this.refetchClaimers());
            }}
            data={employees}
            mode="add"
          />
        </Grid.Column>
        <Grid.Column>
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
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default connect({
  actions: [
    claimers, [
      'setClaimers',
    ],
  ],
  props: [
    claimers, [
      'data',
    ],
  ],
})(UserManager);
