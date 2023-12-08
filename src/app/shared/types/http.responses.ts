import { LoggedUser } from "../../core/models/user";

export type ResponseSuccessSignIn = {
  user: LoggedUser;
}

export type HttpResponseError = string;
