interface AreaReservationsWithAreaData {
    id: string,
    startDate: Date;
    endDate: Date;
    status: string;
    user?: {
        id: string,
        email: string,
        name: string,
        phoneNumber: string,
        foto: string
    },
    area: {
        id: string,
        name: string,
        cost: number,
        startSchedule: string,
        endSchedule: string,
        images: string[],
        type: number
    }
}