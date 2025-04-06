interface AddressesWithUserData {
  id: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  houseType: number;
  createdAT: Date;
  condominiumId: string;
  user: {
    id: string;
    email: string;
    phoneNumber: string;
    foto?: string;
  }
}
