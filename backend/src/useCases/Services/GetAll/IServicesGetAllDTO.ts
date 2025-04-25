export default interface IServicesGetAllDTO {
  condId: string;
  userId: string;
  myServices: boolean;
  minReviews: number;
  maxReviews: number;
  pageSize: number;
  pageNumber: number;
}
