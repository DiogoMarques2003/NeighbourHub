export default interface IAreaReservationsGetDTO {
    userID: string;
    condID: string;
    status: string;
    bGetCondominiumReservations: boolean;
    pageSize: number;
    pageNumber: number
}