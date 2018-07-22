import React from 'react';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { Message } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';


class JsonFormInput extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {};
  }

  parseDate = (str, format, locale) => {
    const parsed = dateFnsParse(str, format, { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  };

  formatDate = (date, format, locale) => dateFnsFormat(date, format, { locale })

  render() {
    const {
      field,
      name,
      label = 'label',
      value,
      onChange,
      setValue,
      error,
      placeholder,
    } = this.props;

    return (
      <div>
        <DayPickerInput
          {...this.props}
          onDayChange={date => setValue(name, date)}
          placeholder={`${dateFnsFormat(new Date('Sun Jul 01 2018 12:00:00 GMT+0100 (CET)'), 'M/D/YYYY')}`}
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
