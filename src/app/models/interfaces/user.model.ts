import { Paginated } from './paginated.model';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export type PaginatedUser = Paginated<User>;
export type SingleUser = {
  data: User;
  support: {
    url: string;
    text: string;
  };
};
