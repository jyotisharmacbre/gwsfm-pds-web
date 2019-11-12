import React from 'react';

class ReduxFormButton extends React.Component<any> {
  handleClick(b) {
    this.props.input.onChange(b.value);
  }

  render() {
    const buttons = [
      {
        title: 'YES',
        value: true
      },
      {
        title: 'NO',
        value: false
      }
    ];

    const { input, label } = this.props;

    return (
      <div className="form-group">
        {label && <label>{label}</label>}
        <div>
          {buttons.map(b => (
            <button
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
