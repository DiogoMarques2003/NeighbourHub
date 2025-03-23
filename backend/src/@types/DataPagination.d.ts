interface DataPagination<T> {
  data: T;
  pages: number;
  actualPage: number;
  nRecords: number;
}
