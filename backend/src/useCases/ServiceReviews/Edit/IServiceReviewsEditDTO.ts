export default interface IServiceReviewsEditDTO {
  condominiumId: string;
  serviceReviewId: string;
  serviceRequestId: string;
  serviceId: string;
  userId: string;
  rating?: number;
  comment?: string;
}
