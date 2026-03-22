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
        class="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-[9999]">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-32 mb-4 animate-scale-bounce rounded-sm" />
        <p class="text-[#007EA7] font-bold text-xl animate-pulse">
          Setting up your workspace...
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
    // 1. Create the Appwrite Session
    await account.createEmailPasswordSession(
      loginForm.contact.trim(),
      loginForm.password
    );

    // 2. Get the authenticated Account ID
    const sessionUser = await account.get();

    // 3. DYNAMIC LOOKUP: Pick the collection based on the dropdown selection
    const targetCollection = loginForm.role === 'provider'
      ? APPWRITE_CONFIG.providersCollection
      : APPWRITE_CONFIG.usersCollection;

    console.log(`Searching in ${loginForm.role} collection...`);

    let userDoc = null;
    try {
      userDoc = await databases.getDocument(
        APPWRITE_CONFIG.dbId,
        targetCollection,
        sessionUser.$id
      );
    } catch (docError) {
      // If document is not found in the SELECTED collection, log them out
      await account.deleteSession('current');
      throw new Error(`No ${loginForm.role} profile found for this account. Did you select the correct role?`);
    }

    // 4. Update local store and session state
    loginUser(null, userDoc);

    // Normalize user data for UI
    auth.isLoggedIn = true;
    auth.user = {
      ...userDoc,
      avatar: (!userDoc.profilePic || userDoc.profilePic === 'user.png')
        ? require("@/assets/user.png")
        : userDoc.profilePic
    };

    // 5. Persistence
    localStorage.setItem("userId", userDoc.$id);
    localStorage.setItem("user", JSON.stringify(userDoc));

    // 6. Success Splash & Redirect
    showSplash.value = true;
    setTimeout(() => {

      // Use the role directly from the retrieved document
      const finalRole = userDoc.role.toLowerCase().trim();

      if (finalRole === "provider") {
        router.push("/serviceprovider");
      } else {
        router.push("/homelogged");
      }
    }, 1500);

  } catch (err) {
    console.error("Login Flow Error:", err);
    errorMessage.value = err.message || "Invalid email or password.";
    toast.error(`❌ ${errorMessage.value}`);
  } finally {
    loading.value = false;
  }
};
</script>
