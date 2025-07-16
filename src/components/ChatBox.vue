<template>
  <div>
    <!-- Floating Button -->
    <button
      @click="toggleChat"
      class="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
    >
      💬
    </button>

    <!-- Chat Box -->
    <div
      v-if="isOpen"
      class="fixed bottom-20 right-6 w-80 bg-white border rounded-xl shadow-lg flex flex-col z-50"
    >
      <div class="bg-blue-600 text-white p-3 rounded-t-xl flex justify-between items-center">
        <h2 class="text-lg font-semibold">Live Chat</h2>
        <button @click="toggleChat" class="text-white text-xl font-bold">&times;</button>
      </div>

      <div ref="chatContainer" class="h-64 overflow-y-auto p-3 bg-gray-50">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="[
            msg.senderId === user1Id ? 'text-right ml-10' : 'text-left mr-10'
          ]"
        >
          <div
            :class="[
              'inline-block px-3 py-2 my-1 rounded-lg text-sm',
              msg.senderId === user1Id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-black'
            ]"
          >
            {{ msg.content }}
          </div>
        </div>
      </div>

      <form @submit.prevent="sendMessage" class="flex gap-2 p-3 border-t bg-white">
        <input
          v-model="newMessage"
          placeholder="Type a message"
          class="flex-1 p-2 border rounded-full text-sm focus:outline-none"
        />
        <button class="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700">
          Send
        </button>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { io } from 'socket.io-client'
import axios from 'axios'

// Props

const props = defineProps({ chatWithId: String });

// UI State
const isOpen = ref(false)
const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) scrollToBottom()
}

// Socket.io
const socket = io('http://localhost:5000')

// Chat State
const messages = ref([])
const newMessage = ref('')
const chatContainer = ref(null)

// Get sender and receiver IDs
const senderId = localStorage.getItem('userId')


// Load existing chat messages
onMounted(async () => {
  try {
     const receiverId = props.chatWithId;
  const senderId = localStorage.getItem('userId');
    const res = await axios.get(`http://localhost:5000/api/messages/${senderId}/${receiverId}`)
    messages.value = res.data
    scrollToBottom()
  } catch (err) {
    console.error('Error loading messages:', err)
  }
})

// Receive new real-time messages
socket.on('newMessage', msg => {
  // Only show if it's part of this conversation
  if (
    (msg.senderId === senderId && msg.receiverId === receiverId) ||
    (msg.senderId === receiverId && msg.receiverId === senderId)
  ) {
    messages.value.push(msg)
    scrollToBottom()
  }
})

// Send new message
async function sendMessage() {
  if (newMessage.value.trim()) {
    const msg = {
      senderId,
      receiverId,
      content: newMessage.value
    }

    try {
      await axios.post('http://localhost:5000/api/messages', msg)
      socket.emit('message', msg)
      messages.value.push(msg)
      newMessage.value = ''
      scrollToBottom()
    } catch (err) {
      console.error('Send error:', err)
    }
  }
}

// Scroll to bottom of chat
function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}
</script>


