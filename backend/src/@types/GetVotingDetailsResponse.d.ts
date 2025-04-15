interface GetVotingDetailsResponse {
  description: string;
  votingDeadline: Date;
  upVotes: number;
  downVotes: number;
  budgets: {
    id: string;
    description: string;
    amount: number;
    createdAt: Date;
    votes: number;
  }[];
  userVote?: {
    decision: boolean;
    budgetId?: string;
  };
}
