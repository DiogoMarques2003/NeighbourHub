import Users from '@entities/Users';

export default interface IUsersRepository {
  findById(id: string): Promise<Users | null>;
  findByEmail(email: string): Promise<Users | null>;
  create(user: Users): Promise<Users>;
}
