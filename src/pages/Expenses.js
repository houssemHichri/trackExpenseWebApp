import React from 'react';
import axios from 'axios';
import { Header, Segment } from 'semantic-ui-react';
import { expenses } from '../../db/json';
import { JsonForm } from '../components/Generic';

const handelSubmitForm = (apiInput) => {
  axios.post('/api/v1/employees', ...apiInput)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Expenses = () => (
  <Segment>
    <Header as="h1">Track Expense Claims</Header>
    <JsonForm
      header="Claim expense"
      withSubmit
      handelSubmitForm={handelSubmitForm}
      data={expenses}
      mode="add"
    />
  </Segment>
);

export default Expenses;
