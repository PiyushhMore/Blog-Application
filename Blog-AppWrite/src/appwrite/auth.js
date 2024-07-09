// All the methods and tasks done here are taken(refrenced/seen) from documentation of Appwrite.io

import conf from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }


    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);    
                                                       //ID was mentioned in documentation so we take here
            if (userAccount) {
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            return error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);   // if not working do createEmailPasswordSession
        } catch (error) {
            return error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AppWrite Service :: getCurrentUser :: error", error)
        }
        
        return null; 

    //   const currentSession = this.account.getSession("current");
    //     try {
    //         if(currentSession){
    //             return await this.account.get()
    //         }
    //         else{

    //         }
    //     } catch (error) {
    //         return null;
    //     }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
        }
    }
}

const authservice = new AuthService();



export default authservice;