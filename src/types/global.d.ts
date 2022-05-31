type ScrapeDataType =
  | 'article-journal'
  | 'thesis'
  | 'paper-conference'
  | 'book';

type ScrapeResult = ScrapeData | ScrapeData[];

interface ScrapeData {
  language?: string;
  type?: ScrapeDataType;
  creators?: { position?: string; literal?: string; type?: number }[];
  title?: string;
  abstracts?: string;
  issued?: { dateParts?: string[][] };
  collectionTitle?: any;
  publisher?: string;
  keywords?: (string | undefined)[];
}

type Scrape = (
  document: Document,
  url: URL
) => {
  type: 'document' | 'collection';
  result?: ScrapeResult;
} | null;
