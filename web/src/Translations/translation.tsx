import en_messages from './languages/en.json';
import hi_messages from './languages/hi.json';
import fr_messages from './languages/fr.json';

const translations: { [key: string]: any } = {
  en: {
    messages: en_messages
  },
  hi: {
    messages: hi_messages
  },
  fr: {
    messages: fr_messages
  }
};

export default translations;
