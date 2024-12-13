import config from '../config/config.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    clint = new Client();
    account;

    constructor(){
        this.clint
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.clint);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount)
            {
                // call another method
            }
            else{
                return userAccount
            }
        } catch (error) {
            console.error('Error creating account:', error);
        }
    }

    async login({email,password,name}){
        try {
            return await this.account.createEmailSessions(email,password);

        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.error('Error getting current user:', error);
        }
    }

}


const authService = new AuthService();
export default authService 