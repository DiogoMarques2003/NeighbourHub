interface ResponseServiceRequestWithUserData {
  id: string;
  requestDate: Date;
  status: string;
  serviceId: string;
  userId: string;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
    foto?: string;
  };
}
