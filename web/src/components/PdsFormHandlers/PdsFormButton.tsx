import React from 'react';
import { FormattedMessage } from 'react-intl';

interface CustomButton {
  title: string;
  value: boolean;
}

interface Props {
  buttons: Array<CustomButton>;
  input: any;
  label: string;
}

class PdsFormButton extends React.Component<Props> {
  handleClick(event, b) {
    event.preventDefault();
    this.props.input.onChange(b.value);
  }

  render() {
    const { buttons, input, label } = this.props;
    return (
      <div className="form-group">
        {label && (
          <label>
            <FormattedMessage id={label} />
          </label>
        )}
        <div>
          {buttons.map(b => (
            <button
              data-test="buttonComponent"
              key={b.title}
              onClick={event => this.handleClick(event, b)}
              className={b.value === input.value ? 'active' : ''}
            >
              <FormattedMessage id={b.title} />
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default PdsFormButton;
