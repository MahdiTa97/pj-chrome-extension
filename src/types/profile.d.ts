interface Profile {
  avatar: string;
  created_at?: null;
  default_collection: DefaultCollection;
  email: string;
  first_name: string;
  full_name: string;
  gender: number;
  id: number;
  last_name: string;
  updated_at?: null;
  username: string;
}
interface DefaultCollection {
  children_count: number;
  cover_pic_urls: CoverPicUrlsOrIconPicUrls;
  created_at: CreatedAtOrUpdatedAt;
  description: string;
  duplicates?: null[] | null;
  files?: null[] | null;
  icon_pic_urls: CoverPicUrlsOrIconPicUrls;
  id: number;
  is_deleted: boolean;
  parent: Parent;
  policies: Policies;
  privacy: PrivacyOrStatus;
  status: PrivacyOrStatus;
  tags?: null[] | null;
  title: string;
  updated_at: CreatedAtOrUpdatedAt;
}
interface CoverPicUrlsOrIconPicUrls {
  lg: string;
  md: string;
  sm: string;
}
interface CreatedAtOrUpdatedAt {
  ago_str: string;
  day: number;
  dayOfWeek: number;
  dayOfYear: number;
  formatted: string;
  hour: number;
  micro: number;
  minute: number;
  month: number;
  second: number;
  timestamp: number;
  timezone: Timezone;
  year: number;
}
interface Timezone {
  timezone: string;
  timezone_type: number;
}
interface Parent {
  created_at: CreatedAtOrUpdatedAt;
  id: number;
  title: string;
  updated_at: CreatedAtOrUpdatedAt;
}
interface Policies {
  add_member: boolean;
  change_permission: boolean;
  delete: boolean;
  kick_member: boolean;
  update: boolean;
}
interface PrivacyOrStatus {
  code: number;
  text: string;
}
