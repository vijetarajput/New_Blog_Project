import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Call another method. if userAccount existed, get him login.
        return this.login({ email, password });
      } else {
        return "User account not created";
      }
    } catch (error) {
      console.log("Error occured", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite error :: getCurrentUser", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      console.log("Appwrite error :: login", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions;
    } catch (error) {
      console.log("Appwrite error :: logout", error);
    }
  }
}

// Here, I am creating all services required by out project so that anytime in the future,
//  we change appwrite, we need to change just this here.

{
}

const authservice = new AuthService();
export default authservice;

// we could have exported the origional class AuthService but the every time
// we would need to create a new object to use class services.
// So we are exporting the object so that we can dirctly use the services using object.
//Eg. authservice.login();
