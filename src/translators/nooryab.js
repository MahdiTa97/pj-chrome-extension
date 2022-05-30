export const label = 'Search INoor';
export const target =
  /^https:\/\/search[-.]inoor[-.]ir\/(compound|book|quran|hadith|article)\?/;

const convertToItem = (data) => {
  if (data.type === 'hadith-suggestion') return;
  if (data.type === 'quran-suggestion') return;
  const typeDict = {
    article: 'article-journal',
    book: 'book',
    hadith: 'chapter',
    quran: 'quran',
  };

  const result = { type: typeDict[data.type], data };

  if (data.type === 'hadith') {
    // it's hadith
    result.title = data.text.substr(0, 32).replace(/<\/?[^>]+(>|$)/g, '');
    result.language = 'ar';
    data.metadataList.forEach((metadata) => {
      if (metadata.title === 'منبع') result['container-title'] = metadata.value;
      if (metadata.title === 'مؤلف')
        result['creators'] = [
          { literal: metadata.value, type: 1, position: 'contributer' },
        ];
      result['contributer'] = [{ literal: metadata.value }];
    });
    return result;
  }
  if (data.type === 'quran') {
    // it's quran
    result.title = `سوره ${data.surahTitle} آیه‌ی ${data.verseNumber}`.replace(
      /<\/?[^>]+(>|$)/g,
      ''
    );
    result.language = 'ar';
    result.chapter = data.surahTitle;
    result.chapterNumber = data.surahId;
    result.verse = data.verseNumber;
    result.verseText = data.text.replace(/<\/?[^>]+(>|$)/g, '');
    result.creators = [];
    return result;
  }
  if (data.type === 'article' || data.type === 'book') result.language = 'fa';
  if (data.type === 'quran' || data.type === 'hadith') result.language = 'ar';
  // title
  result.title = data.title.replace(/<\/?[^>]+(>|$)/g, '');
  // creators
  result.author = data.creatorList.map((creator) => ({
    type: 1,
    literal: creator.name,
  }));
  result.creators = result.author.map((author) => ({
    ...author,
    position: 'author',
  }));
  // tablists
  data.tabList.forEach((tab) => {
    if (tab.type === 'abstract' && tab.value) result.abstract = tab.value;
    (tab.itemList || []).forEach((item) => {
      if (!item.value) return;
      if (item.title === 'ناشر') result.publisher = item.value;
      if (item.title === 'سال نشر')
        result.issued = { 'date-parts': [[item.value]] };
    });
    // }
  });
  (data.metadataList || []).forEach((item) => {
    if (!item.value) return;
    if (item.title === 'عنوان نشریه') result['container-title'] = item.value;
  });
  return result;
};

const searchApi = (source = 'all') => {
  const urlParams = new URLSearchParams(window.location.search);

  const data = JSON.stringify({
    page_number: urlParams.get('page_number') ?? 1,
    query: urlParams.get('query') ?? '',
    source,
    reference: 'test',
  });

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
      const results = { type: 'collection', result: [] };
      const response = JSON.parse(xhr.responseText);
      results.result = response.data.data.resultList
        .map(convertToItem)
        .filter((item) => item);
      return results;
    }
  });

  xhr.open('POST', 'https://search.inoor.ir/Api/v10/Search/CompoundSearch');
  xhr.setRequestHeader('content-type', 'application/json');

  xhr.send(data);
};

export function scrape(document, url) {
  const type = url.pathname.replace('/', '').split('/')[0];

  return searchApi(type === 'compound' ? 'all' : type);
}
