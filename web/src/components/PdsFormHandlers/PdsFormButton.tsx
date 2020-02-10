import React from 'react';
import { FormattedMessage } from 'react-intl';

interface CustomButton {
  title: string;
  value: boolean;
}

interface Props {
  buttons: Array<CustomButton>;
  input: any;
  labelKey: string;
}

class PdsFormButton extends React.Component<Props> {
  handleClick(event, b) {
    event.preventDefault();
    this.props.input.onChange(b.value);
  }

  render() {
    const { buttons, input, labelKey } = this.props;
    return (
      <div className="form-group">
        {labelKey && (
          <label>
            <FormattedMessage id={labelKey} />
          </label>
        )}
        <div>
          {buttons.map((b,index) => (
            <button
              data-test={"buttonComponent_"+index}
              type="button"
              key={b.title}
              onClick={event => this.handleClick(event, b)}
              className={(b.value === input.value ? 'active' : '') + " button-type"}
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
