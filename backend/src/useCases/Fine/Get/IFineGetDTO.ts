export default interface IFineGetDTO {
  userId: string;
  condominiumId: string;
  pageSize?: number;
  pageNumber?: number;
  minValue?: number;
  maxValue?: number;
  sortBy?: string;
  sortOrder?: string;
  fromUserId?: string;
}
