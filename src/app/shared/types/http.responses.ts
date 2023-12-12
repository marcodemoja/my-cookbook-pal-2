import { LoggedUser } from "../../core/interfaces/user";

export type ResponseSuccessSignIn = {
  user: LoggedUser;
}

export type HttpResponseError = string;
