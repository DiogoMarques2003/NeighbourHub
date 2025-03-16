export default class Votings {
  public readonly orderID: string;
  public readonly userID: string;
  public decision: boolean;
  public budgetID?: string;

  constructor(props: Votings) {
    Object.assign(this, props);
  }
}
