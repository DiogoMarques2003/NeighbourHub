export default function stringToHours(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
}