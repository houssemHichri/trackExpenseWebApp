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
