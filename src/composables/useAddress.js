// /src/composables/useAddress.js
import { ref, reactive } from 'vue';
import { toast } from 'vue3-toastify';

export const useAddress = () => {
  const savedAddresses = ref(JSON.parse(localStorage.getItem('addresses')) || []);
  const newAddress = reactive({ pincode: '', city: '', address: '' });
  const showAddressForm = ref(false);

  const saveAddress = () => {
    if (!newAddress.pincode || !newAddress.city || !newAddress.address) {
      return toast.error('Please fill in all fields.');
    }
    savedAddresses.value.push({ ...newAddress });
    localStorage.setItem('addresses', JSON.stringify(savedAddresses.value));
    Object.assign(newAddress, { pincode: '', city: '', address: '' });
    showAddressForm.value = false;
    toast.success("Address saved!");
  };

  const deleteAddress = (index) => {
    savedAddresses.value.splice(index, 1);
    localStorage.setItem('addresses', JSON.stringify(savedAddresses.value));
    toast.success("Address deleted.");
  };

  return { savedAddresses, newAddress, showAddressForm, saveAddress, deleteAddress };
};
