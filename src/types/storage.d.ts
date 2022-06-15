// ======== SCHEMAS ========
interface IItemSchemas {
  data: IItemSchemasData[];
}

interface IItemSchemasData {
  id: number;
  title_fa: string;
  title_en: string;
  csl_slug: string;
  icon: string;
  status: number;
  schema: ISchema[];
  created_at: ICustomTime;
  updated_at: ICustomTime;
}

interface ISchema {
  name: string;
  title: ITitle;
  required: boolean | number;
  main_info: boolean | number;
  positions: IPosition[];
  type: IType;
}

interface IPosition {
  name: string;
  title: ITitle;
}

interface ITitle {
  fa: string;
  en: string;
}

enum IType {
  Year = 'year',
  YearMonthDay = 'year-month-day',
}

// ======= COLLECTIONS ========
interface ICollections {
  data: ICollectionData[];
  meta: {
    total: number;
    current_page: number;
    per_page: number;
  };
}

interface ICollectionData {
  id: number;
  title: string;
  files: any[];
  policies: IPolicies;
  parent: IParent;
  children_count: number;
  tags: any[];
  status: IPrivacy;
  icon_pic_urls: IPicUrls;
  cover_pic_urls: IPicUrls;
  description: string;
  privacy: IPrivacy;
  duplicates: Array<IDuplicate[]>;
  is_deleted: boolean;
  created_at: ICustomTime;
  updated_at: ICustomTime;
}

interface IPicUrls {
  lg: string;
  md: string;
  sm: string;
}

interface ICustomTime {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
  dayOfYear: number;
  hour: number;
  minute: number;
  second: number;
  micro: number;
  timestamp: number;
  formatted: Date;
  timezone: ITimezone;
  ago_str: string;
}

interface ITimezone {
  timezone_type: number;
  timezone: string;
}

interface IDuplicate {
  id: number;
  title: string;
}

interface IParent {
  id: number;
  title: string;
  created_at: ICustomTime;
  updated_at: ICustomTime;
}

interface IPolicies {
  update: boolean;
  delete: boolean;
  add_member: boolean;
  kick_member: boolean;
  change_permission: boolean;
}

interface IPrivacy {
  text: string;
  code: number;
}
