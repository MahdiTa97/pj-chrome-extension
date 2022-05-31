type IScrapeDataType =
  | 'article-journal'
  | 'thesis'
  | 'paper-conference'
  | 'book';

type TScrapeResult = IScrapeData | IScrapeData[];

interface IScrapeData {
  language?: string;
  type?: IScrapeDataType;
  creators?: { position?: string; literal?: string; type?: number }[];
  title?: string;
  abstracts?: string;
  issued?: { dateParts?: string[][] };
  collectionTitle?: any;
  publisher?: string;
  keywords?: (string | undefined)[];
}

type TScrape = (
  document: Document,
  url: URL
) => {
  type: 'document' | 'collection';
  result?: TScrapeResult;
} | null;

interface IDoWeb {
  target: RegExp;
  scrape: TScrape;
  label: string;
}
