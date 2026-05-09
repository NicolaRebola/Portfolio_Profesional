import es from './dictionaries/es.json';
import en from './dictionaries/en.json';

export const getDictionary = (locale: string) => {
  switch (locale) {
    case 'es':
      return es;
    case 'en':
      return en;
    default:
      return es;
  }
};