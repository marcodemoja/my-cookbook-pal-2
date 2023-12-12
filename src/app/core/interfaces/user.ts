export interface User {
  email: string;
}
export interface LoggedUser extends User {
  name: string;
  token: string;
}
export type SignIn = {
  email: string,
  password: string
}

export type SignUp = SignIn & {
  name: string
}



