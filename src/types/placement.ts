export interface BatchInfo {
  year: string;
  status: 'active' | 'coming';
  label: string;
  description: string;
}

export interface BatchesData {
  batches: BatchInfo[];
}

export type PlacementRecord = Record<string, string | number>;

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export const SORTABLE_COLUMNS = ['S.No.', 'Date', 'Company', 'CGPA'];
