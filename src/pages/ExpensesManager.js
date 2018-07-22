import React from 'react';
import axios from 'axios';
import { Header, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { expenses } from '../../db/json';
import { JsonForm } from '../components/Generic';


class ExpensesManager extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      claimer: {},
      loading: true,
      redirect: false,
      edit: null,
    };
  }

  componentDidMount() {
    this.fetchClaimer();
  }

  fetchClaimer = () => {
    axios.get(`/api/v1/employees/${this.props.match.params.target}`)
      .then((response) => {
        this.setState({
          claimer: response.data.claimer,
          loading: false,
        });
        if (this.props.match.params.exTarget) {
          axios.get(`/api/v1/expenses/${this.props.match.params.exTarget}`)
            .then(res => this.setState({
              edit: res.data.expense,
              loading: false,
            }))
            .catch(error => console.log(`api error : /api/v1/expenses ${error}`));
        } else {
          this.setState({
            loading: false,
          })
        }
      })
      .catch(error => console.log(`api error : /api/v1/expenses ${error}`));
  }

  handelSubmitForm = (apiInput) => {
    const { firstName, lastName, _id } = this.state.claimer;
    const apiInputExtend = {
      ...apiInput,
      claimerName: `${firstName} ${lastName}`,
      claimerId: _id,
      approved: false,
    };
    if (this.state.edit) {
      axios.put(`/api/v1/expenses/${this.props.match.params.exTarget}`, apiInputExtend)
        .then(response => this.setState({ redirect: true }))
        .catch(error => console.log);
    } else {
      axios.post('/api/v1/expenses', apiInputExtend)
        .then(response => this.setState({ redirect: true }))
        .catch(error => console.log);
    }
  };

  render() {
    const { claimer = {}, redirect } = this.state;
    if (redirect) {
      return (<Redirect to="/" />);
    }

    const { firstName, lastName } = claimer;
    return (
      <Segment loading={this.state.loading}>
        <Header as="h1">Expense Claims For {`${firstName} ${lastName}`}</Header>
        <JsonForm
          edit={this.state.edit}
          header="Claim expense"
          withSubmit
          handelSubmitForm={this.handelSubmitForm}
          data={expenses}
          mode="add"
        />
      </Segment>
    );
  }
}

export default ExpensesManager;
