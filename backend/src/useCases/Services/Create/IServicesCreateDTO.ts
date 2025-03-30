export default interface IServicesCreateDTO{
    name: string,
    description: string,
    cost?: number,
    ownerId: string,
    condId: string,
}