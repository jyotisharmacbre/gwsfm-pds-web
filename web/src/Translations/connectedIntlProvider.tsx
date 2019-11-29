import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translations from './translation';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getLocaleActionCreator } from './Actions';
import { IState } from '../store/state';

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.

//To fetch the locale of browser following commented code can be used
// if (navigator.language && navigator.language.split(/[-_]/).length > 0) {
//   language = navigator.language.split(/[-_]/)[0];
// }


let intl;
const mapStateToProps = (state: IState) => {
  let { locale } = state.locale;

  let messages = translations[locale].messages;
  let intlProvider = new IntlProvider({ locale, messages });
  intl = intlProvider.state.intl;
  return { locale, messages };
};

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
  dispatch(getLocaleActionCreator());
  return {};
}

export function formatMessage(key: string, value?: object): string {
  try {
    let label: {
      [key: string]: any;
    } = {};
    label[key] = intl.formatMessage({
      id: key
    }, value);
    return label[key];
  } catch{
    return key;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntlProvider);
