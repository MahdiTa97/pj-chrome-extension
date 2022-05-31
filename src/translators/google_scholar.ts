export const label = 'Google Scholar';
export const target =
  /^https?:\/\/scholar[-.]google[-.](com|cat|(com?[-.])?[a-z]{2})(\.[^/]+)?\/(scholar(_case)?\?|citations\?)/;

const language = 'en';

export const scrape: Scrape = (document, url) => {
  const type = 'article-journal';

  const result: ScrapeData | ScrapeData[] = Array.from(
    document.getElementsByClassName('gs_r gs_or gs_scl')
  ).map((tag) => {
    const title = tag.getElementsByClassName('gs_rt')[0].textContent?.trim();

    const abstracts = tag
      .getElementsByClassName('gs_rs')[0]
      .textContent?.trim();

    const greenLine = tag
      .getElementsByClassName('gs_a')[0]
      .textContent?.split('-');

    const [collectionTitle, date] =
      greenLine?.[1]?.split(',').map((item) => item.trim()) ?? [];

    const creators = greenLine?.[0]?.split(',')?.map((name) => ({
      position: 'author',
      literal: name.trim(),
      type: 1, // literal
    }));

    const issued = { dateParts: [[date]] };

    return {
      language,
      type,
      creators,
      title,
      abstracts,
      issued,
      collectionTitle,
    };
  });
  return { type: 'collection', result };
};
