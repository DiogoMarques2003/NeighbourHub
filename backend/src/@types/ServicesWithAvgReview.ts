export default interface ServicesWithAvgReview {
  id: string;
  name: string;
  description: string;
  cost?: number;
  condominiumId: string;
  createdAt: Date;
  avgReview: number;
}