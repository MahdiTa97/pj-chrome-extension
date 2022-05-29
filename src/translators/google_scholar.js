export const label = 'Google Scholar';
export const target =
  /^https?:\/\/scholar[-.]google[-.](com|cat|(com?[-.])?[a-z]{2})(\.[^/]+)?\/(scholar(_case)?\?|citations\?)/;

const language = 'en';

export const scrape = (document) => {
  const data = { language };
  const document_tags = document.getElementsByClassName('gs_r gs_or gs_scl');
  const result = Array.from(document_tags).map((tag) => {
    data.title = tag.getElementsByClassName('gs_rt')[0].textContent.trim();

    const abstracts = tag.getElementsByClassName('gs_rs');
    if (abstracts.length > 0) {
      data.abstract = abstracts[0].textContent.trim();
    }
    const greenLine = tag
      .getElementsByClassName('gs_a')[0]
      .textContent.split('-');

    data.creators = greenLine[0].split(',').map((name) => ({
      position: 'author',
      literal: name.trim(),
      type: 1, // literal
    }));

    const [collectionTitle, date] = greenLine[1].split(',');

    if (date && date !== '') data.issued = { 'date-parts': [[date.trim()]] };
    if (collectionTitle && collectionTitle !== '')
      data['collection-title'] = collectionTitle.trim();
    data.type = 'article-journal';
    return data;
  });
  return { type: 'collection', result };
};
