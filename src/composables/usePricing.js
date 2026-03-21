import { computed } from "vue";

export function usePricing(selectedTier, addons) {
  const total = computed(() => {
    const base = selectedTier.value?.price || 0;
    const addonTotal = addons.value
      .filter(a => a.selected)
      .reduce((sum, a) => sum + a.price, 0);

    return base + addonTotal;
  });

  return { total };
}