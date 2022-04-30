import fa from '../../assets/locales/fa/common.json';

const resources = {
  fa: fa,
};

const t = (text: string) => {
  const selectedResource: any = resources['fa'];
  return selectedResource[text] ? selectedResource[text] : text;
};

export default t;
