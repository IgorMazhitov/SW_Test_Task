/**
 * Interface for user response objects
 */
export interface IUserResponse {
  id: number;
  userName: string;
  email: string;
  role?: {
    id: number;
    name: string;
  };
}

/**
 * Interface for paginated user responses
 */
export interface IPaginatedUsersResponse {
  users: IUserResponse[];
  count: number;
}
