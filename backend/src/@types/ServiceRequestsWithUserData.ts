export default interface ServiceRequestsWithUserData {
    id: string;
    requestDate: Date;
    status: string;
    user: {
        name: string;
        email: string;
        phoneNumber: string;
        foto: String;
    }
}