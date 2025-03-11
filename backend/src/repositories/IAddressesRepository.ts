import Addresses from "@entities/Addresses";

export default interface IAddressesRepository {
    findById(id: string): Promise<Addresses | null>;
    create(address: Addresses): Promise<Addresses>;
}