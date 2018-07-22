// form.js
import { delay } from 'redux-saga';

import createForm from './create-form';

const missingText = 'This field is required';

export default createForm({
  defaults: {
    fields: [],
    handelSubmitForm: null,
  },

  validate: (values) => {
    let fields = {};
    values.fields.forEach((v) => {
      fields = { ...fields, [v]: !values[v] ? missingText : null };
    });
    return fields;
  },

  submit: function * ({ apiInupt, handelSubmitForm }) {
    handelSubmitForm(apiInupt)
  },

  success: function * (response) {
    // ...
  },

  failure: function * (error) {
    window.alert('submit error!', error.message)
  }
});
