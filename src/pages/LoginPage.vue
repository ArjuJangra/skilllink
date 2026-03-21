<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 relative">
    <!-- Navbar -->
    <div class="w-full fixed top-0 left-0 z-50">
      <AppNavbar />
    </div>

    <!-- Splash Screen -->
    <transition name="overlay-fade">
      <div v-if="showSplash"
        class="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-32 mb-4 animate-scale-bounce rounded-sm" />
        <p class="text-gray-700 dark:text-gray-200 font-medium text-lg animate-pulse">
          Loading...
        </p>
      </div>
    </transition>

    <!-- Login Card -->
    <transition name="slide-fade" appear>
      <div v-if="!showSplash" class="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg z-10 mt-20">
        <div class="flex justify-center mb-6">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-24 rounded-lg" />
        </div>

        <h2
          class="text-center text-2xl font-bold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent mb-6">
          Welcome Back to SkillLink
        </h2>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Contact Input -->
          <div class="relative">
            <input v-model="loginForm.contact" type="text" placeholder="Email or Phone" required
              class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              aria-label="Email or phone" />
            <i class="fa-solid fa-user absolute left-3 top-3 text-gray-900 dark:text-gray-300"></i>
            <p v-if="loginForm.contact && !isValidContact(loginForm.contact)" class="text-red-500 text-xs mt-1">
              Please enter a valid email or 10-digit phone number.
            </p>
          </div>

          <!-- Password Input -->
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" v-model="loginForm.password" placeholder="Password"
              required
              class="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              aria-label="Password" />
            <i class="fa-solid fa-lock absolute left-3 top-3 text-gray-900 dark:text-gray-300"></i>
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-2 text-gray-500 text-sm focus:outline-none">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
            <p v-if="loginForm.password && loginForm.password.length < 6" class="text-red-500 text-xs mt-1">
              Password must be at least 6 characters.
            </p>
          </div>

          <!-- Role Selector -->
          <select v-model="loginForm.role"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
            <option value="user">User</option>
            <option value="provider">Service Provider</option>
          </select>

          <!-- Remember + Forgot -->
          <div class="flex justify-between items-center text-sm">
            <label class="flex items-center text-gray-600 dark:text-gray-300">
              <input type="checkbox" v-model="loginForm.remember" class="mr-2" />
              Remember me
            </label>
            <router-link to="/forgot-password" class="text-blue-600 dark:text-blue-400 hover:underline">
              Forgot password?
            </router-link>
          </div>

          <!-- Error -->
          <div v-if="errorMessage" aria-live="polite" class="text-red-500 text-sm">
            {{ errorMessage }}
          </div>

          <!-- Submit -->
          <button :disabled="loading" type="submit"
            class="w-full py-2 rounded-lg text-white font-semibold transition bg-gradient-to-b from-[#00A8E8] to-[#007EA7] hover:bg-[#007EA7] disabled:opacity-50 flex justify-center items-center gap-2">
            <span>{{ loading ? "Logging in..." : "Login" }}</span>
            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </button>

          <!-- OR -->
          <div class="flex items-center my-4">
            <hr class="flex-grow border-gray-300 dark:border-gray-600" />
            <span class="px-2 text-gray-400 text-sm">OR</span>
            <hr class="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          <!-- Signup Link -->
          <p class="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
            Don’t have an account?
            <router-link to="/signup" class="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Sign up
            </router-link>
          </p>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// 1. Import Appwrite services AND your new config
import { account, databases, APPWRITE_CONFIG } from "@/appwrite";
import { auth, loginUser } from "@/stores/auth";
import { toast } from "vue3-toastify";
import AppNavbar from "@/components/AppNavbar.vue";

const router = useRouter();

const loginForm = reactive({
  contact: "",
  password: "",
  role: "user",
  remember: false,
});

const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");
const showSplash = ref(false);

// Appwrite standard login requires email format validation
const isValidContact = (value) => /\S+@\S+\.\S+/.test(value);

const handleLogin = async () => {
  errorMessage.value = "";
  loading.value = true;

  if (!isValidContact(loginForm.contact)) {
    errorMessage.value = "Please enter a valid email address.";
    loading.value = false;
    return;
  }

  try {
    // 2. Appwrite Auth: Create the session
    await account.createEmailPasswordSession(
      loginForm.contact.trim(),
      loginForm.password
    );

    // 3. Get the authenticated Account ID
    const sessionUser = await account.get();

    let userDoc = null;

    // 4. Waterfall Lookup using APPWRITE_CONFIG
    try {
      // Try 'users' collection first
      userDoc = await databases.getDocument(
        APPWRITE_CONFIG.dbId,
        APPWRITE_CONFIG.usersCollection,
        sessionUser.$id
      );
    } catch (userError) {
      try {
        // Fallback to 'providers' collection
        userDoc = await databases.getDocument(
          APPWRITE_CONFIG.dbId,
          APPWRITE_CONFIG.providersCollection,
          sessionUser.$id
        );
      } catch (providerError) {
        // Log out of the session if no profile document exists
        await account.deleteSession('current');
        throw new Error("Account exists, but profile document was not found.");
      }
    }

    // 5. Update local store and session state
    // We pass null for token because Appwrite handles sessions via cookies
    loginUser(null, userDoc);

    // Normalize user data for the UI
    auth.isLoggedIn = true;
    auth.user = {
      ...userDoc,
      avatar: (userDoc.profilePic === 'user.png' || !userDoc.profilePic)
        ? require("@/assets/user.png")
        : userDoc.profilePic
    };

    // 6. Persistence logic
    localStorage.setItem("userId", userDoc.$id);
    localStorage.setItem("user", JSON.stringify(userDoc));

    // 7. Success Splash & Redirect
    showSplash.value = true;
    setTimeout(() => {
      showSplash.value = false;
      // Redirect based on the actual role found in the database document
      router.push(userDoc.role === "provider" ? "/ServiceProvider" : "/homelogged");
    }, 1500);

  } catch (err) {
    console.error("Login Flow Error:", err);
    // Friendly error messaging
    errorMessage.value = err.message || "Invalid email or password.";
    toast.error(`❌ ${errorMessage.value}`, {
      autoClose: 3000,
      position: "bottom-right",
      theme: "colored",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Fade for overlay */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Logo bounce-scale animation */
@keyframes scale-bounce {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.animate-scale-bounce {
  animation: scale-bounce 1s infinite;
}

/* toast.css or global styles */
.toast-custom {
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transform-origin: top center;
  animation: toast-slide-in 0.4s ease forwards;
}

.toast-success {
  background-color: #007EA7;
  color: #fff;
}

.toast-error {
  background-color: #D9534F;
  color: #fff;
}

.toast-loading {
  background-color: #f0f8ff;
  color: #0073b1;
}

/* Animation for entry */
@keyframes toast-slide-in {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Optional exit animation using Vue3-toastify transitions */
@keyframes toast-slide-out {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  100% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
}


.animate-pulse {
  animation: pulse 1s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>