export default interface IOrdersCreateDTO {
  userID: string;
  orderID: string;
  condominiumID: string;
  deadline: Date;
  budgets?: [
    {
      description: string;
      amount: number;
    }
  ];
}
