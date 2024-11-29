interface IBaseUser {

}
export interface IUser {
  id: number;
  avatar?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface IUserDto {
  email?: string;
  lastName?: string;
  firstName?: string;
  avatar?: File | null
}
