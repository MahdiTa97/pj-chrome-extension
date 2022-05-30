export const label = 'Elmnet';
export const target = /^https:\/\/elmnet[-.]ir\/(search|article)/;

const language = 'fa';

const typeDict = [
  { fa: 'پایان‌نامه', csl: 'thesis' },
  { fa: 'مقاله کنفرانس', csl: 'paper-conference' },
  { fa: 'مقاله نشریه', csl: 'article-journal' },
  { fa: 'کتاب', csl: 'book' },
];

function detailPage() {
  const data = { language };

  // type
  const textType = document
    .querySelector('#info > h1 > span')
    ?.textContent.trim();

  data.type = typeDict.find((typeObject) => typeObject.fa === textType).csl;

  if (data.type === undefined) return undefined;

  // title
  data.title = document
    .querySelector('#info > h1 > a > span:nth-child(1)')
    ?.textContent.trim();

  // abstract
  const abstract = document
    .querySelector('#info > div:nth-child(5)')
    ?.textContent.trim()
    .substr(64);

  if (abstract !== 'چکیده ندارد.' && abstract !== '') {
    data.abstract = abstract;
  }

  // creators
  const creatorsString = document
    .querySelector('#info > div.creators > span')
    ?.textContent.trim();

  data.creators = creatorsString?.split('،').map((creator) => ({
    literal: creator.trim(),
    position: 'author',
    type: 1, // literal
  }));

  // publish
  const publishString = document
    .querySelector('#info > .jt')
    ?.textContent.trim();
  const [publisher, issued] = publishString?.split(/[-»]/);
  data.publisher = publisher?.trim();
  data.issued = { 'date-parts': [[(issued || '').trim()]] };

  // keywords
  const keywordsString = document.querySelector('#info > div.keywords');
  const keywords = [];
  for (let i = 0; i < keywordsString?.children.length; i++) {
    keywords.push(keywordsString?.children[i].textContent.trim());
  }
  data.keywords = keywords;

  return { type: 'document', data };
}

function listPage() {
  const data = { type: 'collection', result: [] };

  const articles = document.getElementsByClassName('articlerow');

  data.result = Array.from(articles).map((article) => {
    const result = { language };

    // type
    const textType = article
      .querySelector('.title > .doc-type-box')
      .textContent.trim();

    result.type = typeDict.find((typeObject) => typeObject.fa === textType).csl;

    if (result.type === undefined) return undefined;

    // title
    result.title = article
      .querySelector('.title > .doctitle')
      .textContent.trim();

    // abstract
    const abstract = article
      .querySelector('div:nth-child(5)')
      .textContent.trim()
      .substr(64);

    if (abstract !== 'چکیده ندارد.' && abstract !== '') {
      result.abstract = abstract;
    }

    // creators
    result.creators = Array.from(article.querySelectorAll('.non-creator')).map(
      (item) => ({
        type: 1,
        position: 'author',
        literal: item.textContent.trim(),
      })
    );

    // publish
    const publishString = article
      .querySelector('.jt > span')
      .textContent.trim();

    const [publisher, issued] = publishString.split(/[-»]/);
    result.publisher = publisher.trim();
    result.issued = { 'date-parts': [[(issued || '').trim()]] };

    // keywords
    const keywords = Array.from(
      article.querySelectorAll('.keywords > span')
    ).map((item) => item.textContent.trim());
    result.keywords = keywords;
    return result;
  });
  return data;
}

export function scrape(document, url) {
  const type = url.pathname.replace('/', '').split('/')[0];

  switch (type) {
    case 'article':
      return detailPage();
    case 'search':
      return listPage();
    default:
      break;
  }
}
