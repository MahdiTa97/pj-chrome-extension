export const label = 'Elmnet';
export const target = /^https:\/\/elmnet[-.]ir\/(search|article)/;

const language = 'fa';

const typeDict: {
  fa: string;
  csl: ScrapeDataType;
}[] = [
  { fa: 'پایان‌نامه', csl: 'thesis' },
  { fa: 'مقاله کنفرانس', csl: 'paper-conference' },
  { fa: 'مقاله نشریه', csl: 'article-journal' },
  { fa: 'کتاب', csl: 'book' },
];

const detailPage: Scrape = (document) => {
  // type
  const textType = document
    ?.querySelector('#info > h1 > span')
    ?.textContent?.trim();

  const type = typeDict.find((typeObject) => typeObject.fa === textType)?.csl;

  if (type === undefined) return null;

  // title
  const title = document
    .querySelector('#info > h1 > a > span:nth-child(1)')
    ?.textContent?.trim();

  // abstract
  const abstracts = document
    .querySelector('#info > div:nth-child(5)')
    ?.textContent?.trim()
    .substr(64);

  // creators
  const creatorsString = document
    .querySelector('#info > div.creators > span')
    ?.textContent?.trim();

  const creators = creatorsString?.split('،').map((creator) => ({
    literal: creator.trim(),
    position: 'author',
    type: 1, // literal
  }));

  // publish
  const publishString = document
    .querySelector('#info > .jt')
    ?.textContent?.trim();

  const [publisher, date] =
    publishString?.split(/[-»]/).map((item) => item.trim()) ?? [];

  const issued = { dateParts: [[(date || '').trim()]] };

  // keywords
  const keywordsString = document.querySelector('#info > div.keywords');
  const keywordsStringLength = keywordsString?.children.length ?? 0;
  let keywords = [];

  for (let i = 0; i < keywordsStringLength; i++) {
    keywords.push(keywordsString?.children[i].textContent?.trim());
  }

  return {
    type: 'document',

    result: {
      abstracts,
      creators,
      issued,
      language,
      title,
      type,
      publisher,
    },
  };
};

const listPage: Scrape = (document) => {
  const articles = document.getElementsByClassName('articlerow');

  const result = Object.values(articles).reduce(
    (acc: ScrapeData[], article) => {
      // type
      const textType = article
        .querySelector('.title > .doc-type-box')
        ?.textContent?.trim();

      const type = typeDict.find(
        (typeObject) => typeObject.fa === textType
      )?.csl;

      if (type === undefined) return acc;

      // title
      const title = article
        .querySelector('.title > .doctitle')
        ?.textContent?.trim();

      // abstract
      const abstracts = article
        .querySelector('div:nth-child(5)')
        ?.textContent?.trim()
        .substr(64);

      // creators
      const creators = Array.from(article.querySelectorAll('.non-creator')).map(
        (item) => ({
          type: 1,
          position: 'author',
          literal: item.textContent?.trim(),
        })
      );

      // publish
      const publishString = article
        .querySelector('.jt > span')
        ?.textContent?.trim();

      const [publisher, date] =
        publishString?.split(/[-»]/).map((item) => item.trim()) ?? [];
      const issued = { dateParts: [[(date || '').trim()]] };

      // keywords
      const keywords = Array.from(
        article.querySelectorAll('.keywords > span')
      ).map((item) => item.textContent?.trim());

      if (!acc) {
        acc = [];
      }

      acc.push({
        language,
        abstracts,
        type,
        title,
        creators,
        publisher,
        issued,
        keywords,
      });
      return acc;
    },
    []
  );
  return { type: 'collection', result };
};

export const scrape: Scrape = (document, url) => {
  const type = url.pathname.replace('/', '').split('/')[0];

  switch (type) {
    case 'article':
      return detailPage(document, url);
    case 'search':
      return listPage(document, url);
    default:
      return null;
  }
};
