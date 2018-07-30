import React from 'react';
import { Grid } from 'semantic-ui-react';
import ExpensesInfo from '../components/ExpensesInfo';
import UserManager from '../components/UserManager';

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

  render() {
    return (
      <Grid divided="vertically">
        <Grid.Row>
          <ExpensesInfo />
        </Grid.Row>
        <UserManager />
      </Grid>
    );
  }
}

export default Home;
