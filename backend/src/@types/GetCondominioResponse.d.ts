interface GetCondominioResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  monthlyQuota: number;
  adminId: string;
  createdAt: Date;
  isResident: boolean;
}
