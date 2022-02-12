<template>
  <div class="es-button" :class="{ 'primary': props.type === 'primary' }">
    <slot />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ type: { type: String, default: 'default' }})
</script>
<style scoped>
.es-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  background-color: white;
  border: 0.25rem solid var(--color-secondary);
  border-radius: 1rem 2px 1rem 2px;
  color: var(--color-secondary);
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
}

.es-button.primary {
  background-color: var(--color-primary);
}
</style>
