interface ServicesReviewsWithUserData {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: {
    name: string;
    foto: string;
  };
}
