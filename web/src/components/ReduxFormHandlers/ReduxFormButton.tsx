import React from 'react';

interface CustomButton {
  title: string;
  value: boolean;
}

interface Props {
  buttons: Array<CustomButton>;
  input: any;
  label: string;
}

class ReduxFormButton extends React.Component<Props> {
  handleClick(b) {
    this.props.input.onChange(b.value);
  }

  render() {
    const { buttons, input, label } = this.props;
    return (
      <div className="form-group">
        {label && <label>{label}</label>}
        <div>
          {buttons.map(b => (
            <button
              data-test="buttonComponent"
              key={b.title}
              onClick={() => this.handleClick(b)}
              className={b.value === input.value ? 'active' : ''}
            >
              {b.title}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default ReduxFormButton;
