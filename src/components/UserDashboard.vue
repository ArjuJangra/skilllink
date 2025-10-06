<template>
  <!-- Authenticated Dashboard Wrapper -->
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 py-4 px-2 sm:py-8 sm:px-4">
    <div class="max-w-5xl mx-auto bg-white/70 rounded-3xl shadow-xl p-6">
      <!-- User Profile Card -->
      <div v-if="user"
        class="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-5 sm:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <!-- Profile Section -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">
          <!-- Avatar -->
          <div class="relative group">
            <img :src="user.profilePic ? API.getImageUrl(user.profilePic) : userImg"
              @error="e => e.target.src = userImg"
              class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#00A8E8]/80 object-cover shadow-md transition-all duration-300 group-hover:scale-105"
              alt="Profile Picture" />
            <label
              class="absolute bottom-2 right-2 bg-[#00A8E8] text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-[#007EA7] transition-all duration-200"
              title="Upload Photo">
              <input type="file" class="hidden" @change="handleProfileImageChange" />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M21 7h-3.17l-1.84-2H7.01L5.17 7H2a2 2 0 00-2 2v10a2 2 0 002 2h19a2 2 0 002-2V9a2 2 0 00-2-2zm-9 12a5 5 0 110-10 5 5 0 010 10z" />
              </svg>
            </label>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center sm:text-left w-full">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 truncate">
              {{ user.name }}
            </h2>
            <p class="text-gray-500 text-sm sm:text-base mb-3">@{{ user.username || user.email.split('@')[0] }}</p>

            <div class="flex flex-col sm:flex-row sm:items-center sm:gap-5 text-sm text-gray-700">
              <div class="flex items-center justify-center sm:justify-start gap-2 truncate">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#00A8E8]" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM4 8l8 5 8-5v10H4V8z" />
                </svg>
                <span class="truncate max-w-[180px] sm:max-w-full">{{ user.email }}</span>
              </div>
              <div v-if="user.phone"
                class="flex items-center justify-center sm:justify-start gap-2 truncate mt-2 sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#00A8E8]" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.1-.2 11.05 11.05 0 003.49.55 1 1 0 011 1v3.46a1 1 0 01-1 1C10.4 21 3 13.6 3 5a1 1 0 011-1h3.46a1 1 0 011 1c0 1.2.18 2.38.55 3.47a1 1 0 01-.2 1.1l-2.19 2.22z" />
                </svg>
                <span class="truncate max-w-[180px] sm:max-w-full">{{ user.phone }}</span>
              </div>
            </div>
          </div>

          <!-- Edit Button -->
          <button @click="showEditProfileForm = true"
            class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#007EA7] to-[#00B4DB] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm14.71-9.04a1 1 0 010 1.41l-1.83 1.83-3.75-3.75 1.83-1.83a1 1 0 011.41 0l2.34 2.34z" />
            </svg>
            Edit
          </button>
        </div>
      </div>
      <!-- Edit Profile Modal -->
      <transition name="fade">
        <div v-if="showEditProfileForm"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <transition name="scale-fade">
            <div
              class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 transform transition-all duration-300 scale-100 opacity-100">
              <!-- Header -->
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg sm:text-xl font-semibold text-gray-800">Edit Profile</h3>
                <button @click="showEditProfileForm = false"
                  class="text-gray-400 hover:text-gray-600 transition text-xl">
                  ✕
                </button>
              </div>

              <!-- Form -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">Name</label>
                  <input v-model="editForm.name" type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] outline-none shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <input v-model="editForm.email" type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] outline-none shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  <input v-model="editForm.phone" type="tel"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] outline-none shadow-sm" />
                </div>
              </div>

              <!-- Actions -->
              <div class="mt-6 flex justify-end gap-3">
                <button @click="showEditProfileForm = false"
                  class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition shadow-sm">
                  Cancel
                </button>
                <button @click="updateUserProfile"
                  class="px-4 py-2 bg-[#00A8E8] hover:bg-[#007EA7] text-white rounded-lg font-medium shadow-md transition flex items-center gap-2">
                  <span>Save</span>
                  <svg v-if="loading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </transition>

      <!-- Navigation Tabs -->
      <div class="flex overflow-x-auto no-scrollbar items-center gap-1 sm:gap-3 
         bg-gradient-to-r from-[#f8fbfd] via-[#f3f9fc] to-[#f1f7fb]
         border-b border-gray-100 rounded-2xl p-2 sm:p-4 mt-4 mb-3 shadow-sm">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
          'relative px-4 sm:px-6 py-2 font-medium transition-all duration-300 rounded-lg text-sm sm:text-base whitespace-nowrap',
          activeTab === tab
            ? 'text-[#0083b0] shadow-md scale-105'
            : 'text-gray-600 hover:text-[#0083b0] hover:bg-white/80'
        ]">
          {{ formatTab(tab) }}

          <!-- Animated underline -->
          <span class="absolute left-1/2 -bottom-0.5 h-[2px] w-0 bg-[#00A8E8] transition-all duration-300 rounded-full"
            :class="{ 'w-2/3 left-[16%]': activeTab === tab }"></span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center text-[#007EA7] font-semibold py-6 sm:py-8">Loading...</div>
      <!-- Content -->
      <div v-else class="bg-gradient-to-br from-white via-[#f1faff] to-[#f5fafe]">
        <transition name="fade-slide " mode="out-in">
          <div :key="activeTab" class="w-full bg-white rounded-2xl shadow-md p-4 sm:p-6 transition-all">

            <!-- Bookings Tab -->
            <div v-if="activeTab === 'bookings'" class="space-y-6">
              <h3 class="text-2xl font-bold text-[#007EA7]">My Bookings</h3>
              <div v-if="bookings.length" class="space-y-4">

                <div v-for="booking in bookings" :key="booking._id"
                  class="flex flex-col sm:flex-row justify-between bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition-all border-l-4"
                  :class="booking.status === 'Pending' ? 'border-yellow-500' :
                    booking.status === 'Accepted' ? 'border-blue-500' :
                      booking.status === 'Completed' ? 'border-green-500' : 'border-red-500'">
                  <!-- Status Badge for small screens -->
                  <span class="sm:hidden mb-2 px-3 py-1 rounded-full text-sm font-semibold self-start" :class="booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'">
                    {{ booking.status }}
                  </span>

                  <!-- Left: Booking & Provider Info -->
                  <div class="flex-1 space-y-2">
                    <div class="flex items-center gap-3">
                      <img :src="booking.provider?.avatar || defaultProvider" alt="Provider"
                        class="w-12 h-12 sm:w-14 sm:h-14 rounded-full border object-cover" />
                      <div>
                        <h4 class="text-base sm:text-lg font-semibold text-gray-800">{{ booking.service }}</h4>
                        <p class="text-sm text-gray-600">
                          By {{ booking.provider?.name || "Assigned Expert" }}
                        </p>
                      </div>
                    </div>

                    <p class="text-sm text-gray-600"><span class="font-medium">Name:</span> {{ booking.name }}</p>
                    <p class="text-sm text-gray-600"><span class="font-medium">Contact:</span> {{ booking.contact }}</p>
                    <p class="text-sm text-gray-600"><span class="font-medium">Address:</span> {{ booking.address }}</p>
                    <p class="text-sm text-gray-600"><span class="font-medium">Price:</span> ₹{{ booking.price }}</p>
                    <p class="text-sm text-gray-600"><span class="font-medium">Payment:</span> {{ booking.paymentMethod
                      || 'Cash' }}</p>
                    <p class="text-xs text-gray-400"> Booked: {{ formatDate(booking.createdAt) }}</p>
                  </div>

                  <!-- Right: Status & Actions -->
                  <div class="hidden sm:flex flex-col justify-between items-end ml-4 flex-shrink-0">
                    <!-- Status Badge on top -->
                    <span :class="[
                      'px-3 py-1 rounded-full text-sm font-semibold',
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                    ]">
                      {{ booking.status }}
                    </span>

                    <!-- Buttons at the bottom -->
                    <div class="flex gap-2 mt-auto">
                      <button @click="deleteBooking(booking._id)"
                        class="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm transition flex items-center gap-1">
                        <i class="fas fa-trash"></i> Delete
                      </button>
                      <button v-if="booking.status === 'Pending'"
                        class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm transition">
                        Details
                      </button>
                    </div>
                  </div>
                  <!-- Buttons for small screens -->
                  <div class="flex sm:hidden gap-2 mt-2">
                    <button @click="deleteBooking(booking._id)"
                      class="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm transition flex items-center gap-1">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                    <button v-if="booking.status === 'Pending'"
                      class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm transition">
                      Details
                    </button>
                  </div>


                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="flex flex-col items-center justify-center py-10 text-gray-500">
                <i class="fas fa-calendar-times text-4xl mb-3"></i>
                <p>No bookings found.</p>
                <button @click="router.push('/home')"
                  class="mt-3 px-4 py-2 bg-[#007EA7] text-white rounded-lg hover:bg-[#005f7f] transition">
                  Explore Services
                </button>
              </div>
            </div>

            <!-- History Tab -->
            <div v-else-if="activeTab === 'history'" class="space-y-6">
              <h3 class="text-2xl font-bold text-[#007EA7]">Previous Services</h3>

              <!-- Grid of History Cards -->
              <div v-if="history.length" class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="item in history" :key="item.id"
                  class="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transform hover:scale-105 transition-all p-6 flex flex-col justify-between">

                  <!-- Top Section: Service & Status -->
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h4 class="text-lg font-semibold text-[#007EA7]">{{ item.service }}</h4>
                      <p class="text-gray-500 text-sm">{{ item.date }}</p>
                    </div>

                    <!-- Status Badge -->
                    <span class="flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full" :class="item.status === 'Completed' ? 'bg-green-100 text-green-700'
                      : item.status === 'Rejected' ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'">

                      <svg v-if="item.status === 'Completed'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                      <svg v-else-if="item.status === 'Rejected'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>

                      {{ item.status }}
                    </span>
                  </div>

                  <!-- Optional Description -->
                  <p v-if="item.description" class="text-gray-600 text-sm mb-3 line-clamp-3">{{ item.description }}</p>

                  <!-- Optional Provider Info -->
                  <div v-if="item.provider" class="flex items-center gap-3 mb-3">
                    <img :src="item.provider.avatar || userImg"
                      class="w-10 h-10 rounded-full object-cover border border-gray-200" alt="provider" />
                    <span class="text-gray-700 font-medium">{{ item.provider.name }}</span>
                  </div>

                  <!-- Ratings & Reviews (Only for Completed Services) -->
                  <div v-if="item.status === 'Completed'" class="mt-3 border-t pt-3">
                    <h5 class="text-sm font-semibold text-gray-700 mb-1">Rate & Review</h5>

                    <!-- Star Rating -->
                    <div class="flex items-center mb-2">
                      <template v-for="n in 5" :key="n">
                        <svg @click="item.userRating = n" xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 cursor-pointer"
                          :class="n <= (item.userRating || item.rating) ? 'text-yellow-400' : 'text-gray-300'"
                          fill="currentColor" viewBox="0 0 20 20">
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.05 9.387c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.96z" />
                        </svg>
                      </template>

                    </div>
                    <!-- Review Text -->
                    <textarea v-model="item.userReview" placeholder="Write your review..."
                      class="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-[#00A8E8]"
                      rows="2"></textarea>

                    <button @click="submitReview(item)"
                      class="mt-2 bg-[#00A8E8] text-white px-4 py-1 rounded-lg hover:bg-[#007EA7] text-sm font-medium transition">
                      Submit
                    </button>
                  </div>

                  <!-- Bottom Section: Booked Date & Time -->
                  <div class="flex justify-between items-center mt-auto text-xs text-gray-400">
                    <span>Booked {{ isValidDate(item.date) ? relativeDate(item.date) : 'N/A' }}</span>
                    <span>{{ isValidDate(item.date) ? formatTime(item.date) : '' }}</span>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="flex flex-col items-center justify-center py-16 text-gray-500 space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-lg font-medium">No service history available.</p>
                <button @click="router.push('/services')"
                  class="bg-[#007EA7] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#005f91] transition">
                  Explore Services
                </button>
              </div>
            </div>

            <!-- Address Tab -->
            <div v-else-if="activeTab === 'address'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-[#007EA7]">Saved Addresses</h3>
                <span @click="showAddressForm = !showAddressForm"
                  class="text-sm text-[#007EA7] hover:text-[#005f7f] font-medium cursor-pointer">
                  {{ showAddressForm ? 'Close' : 'Add New Address' }}
                </span>
              </div>

              <!-- Address Form -->
              <transition name="fade">
                <div v-if="showAddressForm" class="bg-gray-50 border p-4 rounded-xl space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input v-model="newAddress.pincode" placeholder="Pincode" class="input-edit" />
                    <input v-model="newAddress.city" placeholder="City" class="input-edit" />
                  </div>
                  <textarea v-model="newAddress.address" placeholder="Full Address" rows="2"
                    class="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"></textarea>
                  <div class="flex gap-3">
                    <button @click="saveAddress"
                      class="bg-[#007EA7] hover:bg-[#005f7f] text-white px-4 py-2 rounded-md transition">
                      Save
                    </button>
                    <button @click="showAddressForm = false"
                      class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition">
                      Cancel
                    </button>
                  </div>
                </div>
              </transition>

              <!-- Address List -->
              <div v-if="savedAddresses.length" class="grid md:grid-cols-2 gap-4">
                <div v-for="addr in savedAddresses" :key="addr.id || addr.pincode"
                  class="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition relative">
                  <div class="space-y-1 text-sm text-gray-700">
                    <p><strong class="text-[#007EA7]">Pincode:</strong> {{ addr.pincode }}</p>
                    <p><strong class="text-[#007EA7]">City:</strong> {{ addr.city }}</p>
                    <p><strong class="text-[#007EA7]">Address:</strong> {{ addr.address }}</p>
                  </div>
                  <button @click="deleteAddress(savedAddresses.indexOf(addr))"
                    class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-semibold">
                    ✕
                  </button>
                </div>
              </div>
              <p v-else class="text-gray-500">No saved addresses found.</p>
            </div>
            <!-- Settings Tab -->
            <div v-else-if="activeTab === 'settings'" class="space-y-6">
              <h3 class="text-xl font-semibold text-[#007EA7]">Account Settings</h3>

              <!-- Notification Preferences -->
              <h4 class="font-semibold text-gray-700 cursor-pointer hover:text-[#007EA7] transition"
                @click="showNotificationPreferences = !showNotificationPreferences">
                Notification Preferences
              </h4>
              <div v-if="showNotificationPreferences" class="mt-4 space-y-3">
                <div v-for="(value, type) in notificationSettings" :key="type"
                  class="flex justify-between items-center">
                  <span class="capitalize text-sm text-gray-600">{{ type }}</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationSettings[type]" class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-300 peer-checked:bg-[#007EA7] rounded-full transition-all">
                      <div
                        class="absolute w-4 h-4 bg-white rounded-full left-1 top-1 transition peer-checked:translate-x-5">
                      </div>
                    </div>
                  </label>
                </div>
                <button @click="updateNotificationSettings" :disabled="isSavingNotifications" class="btn-blue mt-2">
                  {{ isSavingNotifications ? 'Saving...' : 'Save Preferences' }}
                </button>
              </div>

              <!-- Change Password -->
              <div>
                <h4 class="font-semibold text-gray-700 cursor-pointer hover:text-[#007EA7] transition"
                  @click="showPasswordForm = !showPasswordForm">
                  {{ showPasswordForm ? 'Cancel Change Password' : 'Change Password' }}
                </h4>
                <div v-if="showPasswordForm" class="mt-4 space-y-3 bg-gray-100 p-4 rounded-xl">
                  <input v-model="passwordForm.current" placeholder="Current Password" type="password"
                    class="input-edit" />
                  <input v-model="passwordForm.new" placeholder="New Password" type="password" class="input-edit" />
                  <input v-model="passwordForm.confirm" placeholder="Confirm New Password" type="password"
                    class="input-edit" />
                  <div class="flex justify-between items-center">
                    <button @click="changePassword" :disabled="isChangingPassword" class="btn-blue">
                      {{ isChangingPassword ? 'Changing...' : 'Submit' }}
                    </button>
                    <a href="/forgot-password" class="text-sm text-[#007EA7] hover:underline">Forgot Password?</a>
                  </div>
                </div>
              </div>

              <!-- Logout -->
              <div>
                <button @click="showLogoutModal = true" class="btn-red">Logout</button>
              </div>

              <!-- Logout Modal -->
              <transition name="fade-zoom">
                <div v-if="showLogoutModal"
                  class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <div class="bg-white p-6 rounded-xl shadow-xl w-80">
                    <h2 class="text-lg font-semibold mb-2">Confirm Logout</h2>
                    <p class="text-gray-600 mb-4">Are you sure you want to logout?</p>
                    <div class="flex justify-end space-x-3">
                      <button @click="showLogoutModal = false" class="btn-gray">Cancel</button>
                      <button @click="confirmLogout" class="btn-red">Logout</button>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

          </div>
        </transition>
      </div>
    </div>
  </div>

  <!-- Redirect Notice -->
  <div v-else class="text-center mt-10 sm:mt-20 text-gray-500">Redirecting to login...</div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import API from '@/api';
import { auth, logoutUser } from '@/stores/auth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { io } from 'socket.io-client';
import { useUser } from '@/composables/useUser';
import { useBookings } from '@/composables/useBooking';
import { useNotifications } from '@/composables/useNotifications';
import { useSocket } from '@/composables/useSocket';
import { useAddress } from '@/composables/useAddress';
import { useSettings } from '@/composables/useSettings';
const token = localStorage.getItem('token');

const router = useRouter();
const isAuthenticated = ref(false);
const isLoading = ref(true);
const showLogoutModal = ref(false);
const showEditProfileForm = ref(false);
const activeTab = ref(localStorage.getItem("activeTab") || "bookings");

// --- Composables ---
const { user, editForm, getUserProfile, updateUserProfile, handleProfileImageChange } = useUser();
const { bookings, history, fetchBookings, fetchHistory, moveToHistory, deleteBooking, submitReview } = useBookings();
const { notificationSettings, fetchNotificationSettings, updateNotificationSettings } = useNotifications();
const { savedAddresses, newAddress, showAddressForm, saveAddress, deleteAddress } = useAddress();
const { passwordForm, showPasswordForm, isChangingPassword, changePassword } = useSettings();
const { socket, connect, disconnect } = useSocket(API.defaults.baseURL, token);


// --- Watchers ---
watch(showEditProfileForm, val => {
  if (val) Object.assign(editForm, { name: user.value.name, email: user.value.email, phone: user.value.phone });
});
watch(activeTab, val => localStorage.setItem("activeTab", val));

// --- Helpers ---
const formatTab = t => t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ');
const isValidDate = d => d && !isNaN(new Date(d).getTime());
const formatTime = d => isValidDate(d) ? dayjs(d).format('hh:mm A') : '';
const relativeDate = d => isValidDate(d) ? dayjs(d).fromNow() : 'N/A';
const formatDate = d => isValidDate(d) ? dayjs(d).format('DD MMM YYYY, hh:mm A') : '';

// --- Logout ---
const logout = () => {
   auth.user = null;
  logoutUser();
  socket.value?.disconnect();
  router.push('/homeboard');
};
const confirmLogout = () => { logout(); showLogoutModal.value = false; };

// --- Lifecycle ---
onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error("Please login first");
    return router.push('/login');
  }

  const localUser = JSON.parse(localStorage.getItem('user'));
  if (localUser?.role === 'provider') return router.push('/provider/profile');

  isAuthenticated.value = true;

  // Fetch all initial data
  await Promise.all([
    getUserProfile(),
    fetchBookings(),
    fetchHistory(),
    fetchNotificationSettings()
  ]);
connect(user.value._id);
  // Initialize socket after fetching user data
  socket.value = io(API.defaults.baseURL, {
    auth: { token },
    withCredentials: true,
    transports: ['websocket']
  });
  socket.value.emit('join', user.value._id);

  // Socket event listeners
  socket.value.on('orderAccepted', (d) => { toast.info(`✅ Accepted by ${d.providerName}`);
    fetchBookings(); });

  socket.value.on('orderRejected', (d) => { toast.info(`❌ Rejected by ${d.providerName}`);
    fetchBookings();});

  socket.value.on('orderCompleted', (d) => { toast.success(`🎉 Booking for ${d.service} is completed`);
 const booking = bookings.value.find(b => b._id === d._id);
    if (booking) moveToHistory(booking); });

  socket.value.on('newReview', (d) => { toast.info(`New review from ${d.userName} for ${d.bookingId}`); });
  isLoading.value = false;
});

onUnmounted(() => disconnect());
</script>

<style scoped>
/* Responsive Images */
@media (max-width: 640px) {
  img {
    width: 5.5rem !important;
    height: 5.5rem !important;
  }
}

/* No Scrollbar */
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Animations */
.fade-zoom-enter-active,
.fade-zoom-leave-active,
.fade-tab-enter-active,
.fade-tab-leave-active,
.fade-enter-active,
.fade-leave-active,
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-tab-enter-from,
.fade-tab-leave-to,
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

/* Inputs */
.input-edit {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem;
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.input-edit:focus {
  border-color: #00A8E8;
  box-shadow: 0 0 0 2px #00A8E8;
}

/* Buttons */
.btn-blue,
.btn-green,
.btn-gray,
.btn-red {
  border-radius: 0.375rem;
  color: #fff;
  transition: background-color 0.2s;
}

.btn-blue,
.btn-red { padding: 0.5rem 1rem; }
.btn-green,
.btn-gray { padding: 0.25rem 0.75rem; }
.btn-gray { color: #1f2937; }

/* Button Colors & Hover */
.btn-blue { background: #007EA7; }
.btn-blue:hover { background: #005f78; }

.btn-green { background: #22c55e; }
.btn-green:hover { background: #16a34a; }

.btn-gray { background: #d1d5db; }
.btn-gray:hover { background: #9ca3af; }

.btn-red { background: #ef4444; }
.btn-red:hover { background: #dc2626; }
</style>
