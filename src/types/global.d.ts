type IScrapeDataType =
  | 'article-journal'
  | 'thesis'
  | 'paper-conference'
  | 'book';

type TScrapeResult = IScrapeData[];

interface IScrapeData {
  id: string;
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

type TScrapeResponse = {
  type: 'document' | 'collection';
  result?: TScrapeResult;
} | null;

type TScrape = (document: Document, url: URL) => TScrapeResponse;

interface IDoWeb {
  target: RegExp;
  scrape: TScrape;
  label: string;
}
