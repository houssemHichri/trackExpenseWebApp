import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

class JsonFormInput extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {};
  }

  render() {
    const {
      field,
      name,
      label = 'label',
      value,
      onChange,
      setValue,
      error,
      edit,
      placeholder,
    } = this.props;

    return (
      <div>
        <Form.Input
          placeholder={placeholder}
          error={error}
          label={field.title}
          className="form-field"
          onChange={e => setValue(name, e.target.value)}
          {...this.props}
        />
        {error ? (
          <Message negative>
            <Message.Header>Error:</Message.Header>
            <p>{error}</p>
          </Message>
        ) : null}
      </div>
    );
  }
}

export default JsonFormInput;
