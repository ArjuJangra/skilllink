import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('69bc198500215f4bf3b0'); 

// 1. Define your IDs here
export const APPWRITE_CONFIG = {
    dbId: '69bc1ae900174fd0a3c6',          // Replace with your actual Database ID
    usersCollection: 'users',          // Replace with your User Collection ID
    providersCollection: 'providers', 
    servicesCollection: 'services', // Replace with your Service Collection ID
    storageBucket: '69bc270e0029df27ceed'    // Optional: for profile pictures
};


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// CHANGE THIS: Export it as 'client' so your imports work
export { client, ID }; 

// Keep this if you want to import the whole thing as a default
export default client;