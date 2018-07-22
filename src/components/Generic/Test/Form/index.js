import React from 'react';
// import { Header, Button, Form, Segment } from 'semantic-ui-react';

class JsonForm extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {};
  }
  render() {
    console.log('##################');
    console.log(this.props);
    return <h1>Hello</h1>;
  }
}

export default JsonForm;


import React from 'react';
import { Header, Button, Form, Segment } from 'semantic-ui-react';

const Com = () => (
    <Segment>
      <Header as="h3">Add Employees</Header>
      <Form>
        <Form.Field
          label="Full name"
          control="input"
          placeholder="Full name"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Segment>
);

export default Com;
