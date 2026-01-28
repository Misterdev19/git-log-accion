// types/Action.ts
export interface User {
  name: string;
  email: string;
}

export interface LastCommit {
  hash: string;
  message: string;
  author: string;
}

export interface Action {
  id: number;
  action_type: string;
  timestamp: string;
  user: User;
  branch_name: string;
  hostname: string;
  last_commit: LastCommit;
  remote_ref: string;
  status: string;
  commits_count: number;
  commits: any[];
  created_at: string;
}

export interface MetaLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface ActionsResponse {
  data: Action[];
  links: Links;
  meta: Meta;
}