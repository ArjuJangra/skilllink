import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('69bc198500215f4bf3b0'); 

// 1. Updated Configuration Object
export const APPWRITE_CONFIG = {
    dbId: '69bc1ae900174fd0a3c6',
    usersCollection: 'users',
    providersCollection: 'providers', 
    servicesCollection: 'services',
    bookingsCollection: 'bookings', 
    storageBucket: '69bc270e0029df27ceed',
    bucketId: '69bc270e0029df27ceed' 
};

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Exporting ID and Client for use in your components
export { client, ID }; 

// Default export
export default client;