import React,{useState,useEffect} from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { FormattedMessage, injectIntl } from 'react-intl';

const AdaptedTypeahead = ({ input, render, meta, labelName, className, ...rest }) => {
    const [init,setInit] = useState<boolean>(false);

    useEffect(() => {
      if(!init && input.value){
        setInit(true);
        rest.onSearch(input.value);
      }
    }, [input.value]);
  const formatValue = () => {
    let result = '';
    result = input.value != '' ? (rest.options.filter(option => option[rest.submitParam] == input.value)).slice() : '';
    return result;
  }

  return (
    <div className={'form-group'}>
      {
        labelName &&
        <label>
          <FormattedMessage id={labelName} defaultMessage={labelName} />
          {className && className.split(' ').includes('required') ? '*' : ''}
        </label>
      }
      <AsyncTypeahead {...input} {...rest}
        minLength={3}
        selected={formatValue()}
      />
      {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
    </div>
  )
};

export default AdaptedTypeahead;