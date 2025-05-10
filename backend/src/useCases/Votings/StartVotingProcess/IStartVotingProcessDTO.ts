export default interface IStartVotingProcessDTO {
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
