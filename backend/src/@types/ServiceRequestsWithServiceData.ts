export default interface ServiceRequestsWithServiceData {
    id: string;
    requestDate: Date;
    status: string;
    service: {
        id: string;
        name: string;
        description: string;
        cost: number;
    };
    owner: {
        name: string;
        email: string;
        phoneNumber: string;
        foto: string;
    }
}