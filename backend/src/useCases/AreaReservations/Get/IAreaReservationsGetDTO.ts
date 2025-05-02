export default interface IAreaReservationsGetDTO {
    userID: string;
    condID: string;
    status: string;
    pageSize: number;
    pageNumber: number;
}