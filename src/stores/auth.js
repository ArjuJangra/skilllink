import { reactive } from 'vue';
import { account, databases } from "@/appwrite"; // Assuming your Appwrite config is here

export const auth = reactive({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('userId'), // Using userId as a persistent flag
});

/**
 * Syncs the session with Appwrite on page load/refresh
 */
export async function initAuth() {
  try {
    // 1. Check if an active session exists in Appwrite
    const sessionUser = await account.get();
    
    // 2. Since your data is split, we try to find the profile
    // Replace 'YOUR_DATABASE_ID' with your actual ID
    const DATABASE_ID = 'YOUR_DATABASE_ID';
    let profile = null;

    try {
      profile = await databases.getDocument(DATABASE_ID, 'users', sessionUser.$id);
    } catch (e) {
      try {
        profile = await databases.getDocument(DATABASE_ID, 'providers', sessionUser.$id);
      } catch (err) {
        console.error("Authenticated but no profile document found.");
      }
    }

    if (profile) {
      auth.user = profile;
      auth.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(profile));
      localStorage.setItem("userId", profile.$id);
    }
  } catch (err) {
    // No active session found
    console.warn("No active session:", err.message);
    logoutUser();
  }
}

/**
 * Updates the store after a successful login/signup
 */
export function loginUser(token, userData) {
  // Appwrite handles the session internally; 'token' is not manually needed
  auth.user = userData;
  auth.isLoggedIn = true;
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('userId', userData.$id);
}

/**
 * Ends the Appwrite session and clears local state
 */
export async function logoutUser() {
  try {
    // Delete the session from Appwrite server
    await account.get();
    await account.deleteSession('current');
  } catch (err) {
    console.error("Appwrite logout error:", err.message);
  } finally {
    // Always clear local state even if server call fails
    auth.isLoggedIn = false;
    auth.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }
}

/**
 * Refresh the current user's profile data
 */
export async function fetchUserProfile() {
  if (!auth.user?.$id) return;

  try {
    const collection = auth.user.role === 'provider' ? 'providers' : 'users';
    const profile = await databases.getDocument(
      '69bc1ae900174fd0a3c6',
      collection,
      auth.user.$id
    );
    auth.user = profile;
    localStorage.setItem("user", JSON.stringify(profile));
  } catch (error) {
    console.error("❌ Fetch profile error:", error);
    if (error.code === 401) {
      logoutUser();
    }
  }
}