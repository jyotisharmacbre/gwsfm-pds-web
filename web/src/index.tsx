import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider, FormattedMessage, FormattedHTMLMessage, createIntl, createIntlCache, RawIntlProvider} from 'react-intl';

// import locale_en from 'react-intl/locale-data/en';
import messages_en from "../src/Translations/en.json";
const cache = createIntlCache();

const messages = [{
    'en': messages_en
}];

const intl = createIntl({
    locale: 'en-En',
    messages: messages_en
  }, cache)

//addLocaleData([...messages_en]);
ReactDOM.render(<RawIntlProvider  value={intl}><App /> </RawIntlProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
