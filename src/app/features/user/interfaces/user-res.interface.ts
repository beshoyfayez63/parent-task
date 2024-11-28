import { IUser } from "./user.interface";


export interface IUsersRes {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[]
}
