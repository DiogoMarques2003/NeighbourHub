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
        upVotes: number;
        downVotes: number;
    }[];
    userVote?: {
        decision: boolean;
        budgetId?: string;
    }
}