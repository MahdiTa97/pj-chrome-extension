interface ICollections {
  data: ICollectionsData[];
  meta: {
    total: number;
    current_page: number;
    per_page: number;
  };
}

interface ICollectionsData {
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
