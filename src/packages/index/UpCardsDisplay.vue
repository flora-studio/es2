<template>
  <es-button @click="show = true">UP卡片</es-button>
  <es-dialog v-model:show="show" top="10rem">
    <div style="display: flex; padding: 2rem">
      <es-card v-for="card in upCards" :key="card.id" :card="card" :count="0" :lazy="false" :is-new="false" />
    </div>
  </es-dialog>
</template>
<script setup lang="ts">
import EsButton from './common/EsButton.vue'
import {ref} from 'vue'
import {upCards} from './logic/store'
import EsCard from './common/EsCard.vue'
import EsDialog from './common/EsDialog.vue'

const show = ref(false)
</script>
<style scoped>
.es-card + .es-card {
  /* some mobile browser don't support gap */
  margin-left: 2rem;
}
</style>
