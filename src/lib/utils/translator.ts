import fa from '../../assets/locales/fa/common.json';
import en from '../../assets/locales/en/common.json';

const resources = {
  fa: fa,
  en: en,
};

const t = (text: string) => {
  const selectedResource: any = resources['fa'];

  return selectedResource[text] ? selectedResource[text] : text;
};

export default t;
