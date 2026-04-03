import { reactive } from 'vue';
import { account, databases } from "@/appwrite";

// DATABASE CONFIG
const DATABASE_ID = '69bc1ae900174fd0a3c6';

export const auth = reactive({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('userId'),
});

/**
 * LOGOUT: Ensures the reactive state is wiped BEFORE the redirect.
 */
export async function logoutUser() {
  try {
    // Attempt to kill session on Appwrite server
    await account.deleteSession('current');
  } catch (err) {
    console.warn("Appwrite session already gone or error:", err.message);
  } finally {
    // CRITICAL: Wipe reactive state immediately so Navbar reacts
    auth.isLoggedIn = false;
    auth.user = null;

    // Clear ALL storage to ensure no leftover tokens/IDs
    localStorage.clear();

    console.log("Auth state cleared globally.");
  }
}

/**
 * INIT: Syncs session and determines if user is Provider or Customer
 */
export async function initAuth() {
  try {
    const sessionUser = await account.get();
    let profile = null;

    // Try finding in Users collection first
    try {
      profile = await databases.getDocument(DATABASE_ID, 'users', sessionUser.$id);
      if (profile) profile.role = 'user';
    } catch (e) {
      // If not in users, try Providers
      try {
        profile = await databases.getDocument(DATABASE_ID, 'providers', sessionUser.$id);
        if (profile) profile.role = 'provider';
      } catch (err) {
        console.error("No profile found in either collection.");
      }
    }

    if (profile) {
      // Call loginUser to sync state and storage
      loginUser(profile);
    } else {
      // If session exists but no profile document, clear state
      logoutUser();
    }
  } catch (err) {
    auth.isLoggedIn = false;
    auth.user = null;
    localStorage.clear();
  }
}

/**
 * Updates the store after a successful login/signup
 * Added safety checks to prevent '$id' of null error
 */
export function loginUser(userData) {
  if (!userData) {
    console.error("loginUser called with null/undefined data");
    return;
  }

  // Update Reactive State
  auth.user = userData;
  auth.isLoggedIn = true;

  // Update LocalStorage safely
  localStorage.setItem('user', JSON.stringify(userData));

  // Use optional chaining (?.) or check existence
  const userId = userData.$id || userData.id;
  if (userId) {
    localStorage.setItem('userId', userId);
  }

  console.log("Store Updated:", auth.user.role);
}