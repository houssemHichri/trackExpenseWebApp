import React from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Segment } from 'semantic-ui-react';
import { connect } from 'kea';
import JsonFormInput from './JsonFormInput';
import JsonFormDate from './JsonFormDate';
import form from '../../../state/form';
import { getKeys } from '../utils';

@connect({
  actions: [
    form, [
      'initValue',
      'setValue',
      'submit',
    ],
  ],
  props: [
    form, [
      'values',
      'isSubmitting',
      'errors',
    ],
  ],
})
class JsonForm extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {};
  }
  componentDidMount() {
    const { handelSubmitForm, data, edit } = this.props;
    let formFields = {};
    getKeys(data).forEach((f) => {
      // in edit mode initiate store with saved data
      const init = edit ? edit[f] : '';
      formFields = { ...formFields, [f]: init };
    });
    this.actions.initValue(formFields, handelSubmitForm);
  }

  renderField = (type, f) => {
    const {
      edit,
      data,
      errors,
      values,
    } = this.props;
    const { setValue } = this.actions;

    switch (type) {
      case 'String':
        return (
          <JsonFormInput
            placeholder={!edit ? data[f].title : edit[f]}
            setValue={setValue}
            field={data[f]}
            key={f}
            error={errors[f]}
            name={f}
            value={!edit ? values[f] : edit[f]}
          />
        );
      case 'Number':
        return (
          <JsonFormInput
            placeholder={!edit ? data[f].title : edit[f]}
            setValue={setValue}
            field={data[f]}
            key={f}
            error={errors[f]}
            name={f}
            value={values[f]}
          />
        );
      case 'Date':
        return (
          <JsonFormDate
            setValue={setValue}
            field={data[f]}
            key={f}
            error={errors[f]}
            name={f}
            value={values[f]}
          />
        );
      default:
        return (<div>null</div>);
    }
  }

  render() {
    const {
      data,
      withSubmit,
      header,
      isSubmitting,
    } = this.props;
    const { submit } = this.actions;

    return (
      <Segment>
        <Header as="h3">{header}</Header>
        <Form onSubmit={submit}>
          {getKeys(data).map((f) => {
            const { type } = data[f];
            return this.renderField(type, f);
          })}
          {withSubmit && (<Form.Button content={isSubmitting ? 'Submitting...' : 'Submit!'} />)}
        </Form>
      </Segment>
    );
  }
}

export default JsonForm;
