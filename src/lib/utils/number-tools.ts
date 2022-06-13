const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const EN_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const REGEX_LIST = {
  enNum: /[0-9]/g,
  faNum: [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
};

export const sanitizedTxt = (txt?: string | number): string => {
  if (txt == null) return '';
  else if (typeof txt === 'number') return String(txt);
  else return txt;
};

export const numToEn = (txt: string | number): string => {
  txt = sanitizedTxt(txt);

  for (let i = 0; i < FA_DIGITS.length; i++) {
    txt = txt.replace(REGEX_LIST.faNum[i], String(i));
  }

  return txt;
};

export const numToFa = (txt: string | number): string =>
  sanitizedTxt(txt).replace(REGEX_LIST.enNum, (w) => FA_DIGITS[+w]);

export const numToCurrency = (amount: string | number): string =>
  sanitizedTxt(amount);

export const shortenNumber = (num: number | string): string =>
  new Intl.NumberFormat('en', { notation: 'compact' }).format(
    +sanitizedTxt(num)
  );

export const addLeadingZero = (num: number | string): string =>
  sanitizedTxt(num).padStart(2, '0');
