<template>
  <es-button @click="show = true">UP卡片</es-button>
  <n-modal v-model:show="show">
    <div class="dialog">
      <div class="title"><span style="cursor: pointer" @click="show = false">╳</span></div>
      <div style="display: flex; padding: 2rem">
        <es-image v-for="card in upCards" :key="card.id" :src="card.img" :description="useCardDescription(card)" img-class="img"/>
      </div>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import EsButton from './common/EsButton.vue'
import {NModal} from 'naive-ui'
import {ref} from 'vue'
import {upCards} from './logic/store'
import EsImage from './common/EsImage.vue'
import {useCardDescription} from './logic/useCardDescription'

const show = ref(false)
</script>

<style scoped>
.dialog {
  background: white;
  position: absolute;
  top: 10rem;
  left: 50%;
  transform: translateX(-50%);
}

.title {
  text-align: right;
  color: white;
  background-color: var(--color-secondary);
  font-size: 2rem;
  font-weight: bold;
  padding: 0 1rem;
  height: 3rem;
  line-height: 3rem;
}

::v-deep .img {
  width: 15rem;
  height: 18.8rem;
}

.es-image + .es-image {
  /* some mobile browser don't support gap */
  margin-left: 2rem;
}
</style>
