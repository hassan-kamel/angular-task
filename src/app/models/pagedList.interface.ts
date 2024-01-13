export interface IPagedList<T> {
  totalCount: number;
  totalPages: number;
  data: T[];
}
