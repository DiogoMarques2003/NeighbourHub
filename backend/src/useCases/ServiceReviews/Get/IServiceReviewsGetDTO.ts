export default interface IServiceReviewsGetDTO {
  condominiumId: string;
  serviceId: string;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
  userId: string;
}
