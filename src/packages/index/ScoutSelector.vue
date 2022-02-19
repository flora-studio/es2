<template>
  <es-button @click="show = true">切换卡池</es-button>
  <es-dialog v-model:show="show" top="4rem">
    <n-tabs default-value="event" type="segment">
      <n-tab-pane name="event" display-directive="show:lazy" tab="活动">
        <es-gallery>
          <es-image
              v-for="scout in eventScouts"
              :key="scout.name"
              :src="scout.banner"
              :description="scout.name"
              img-class="img"
              lazy
              @click="select(scout)"
          />
        </es-gallery>
      </n-tab-pane>
      <n-tab-pane name="feature" display-directive="show:lazy" tab="个人">
        <es-gallery>
          <es-image
              v-for="scout in featureScouts"
              :key="scout.name"
              :src="scout.banner"
              :description="scout.name"
              img-class="img"
              lazy
              @click="select(scout)"
          />
        </es-gallery>
      </n-tab-pane>
    </n-tabs>
  </es-dialog>
</template>
<script setup lang="ts">
import EsButton from './common/EsButton.vue'
import EsImage from './common/EsImage.vue'
import {NModal, NTabs, NTabPane} from 'naive-ui'
import {ref} from 'vue'
import {Scout, useScoutStorage} from '../../composables/useScouts'
import EsGallery from './common/EsGallery.vue'
import {currentScout, lastEventScout, lastFeatureScout} from './logic/store'
import {sortBy} from 'lodash-es'
import EsDialog from './common/EsDialog.vue'

const show = ref(false)

const allScouts = useScoutStorage()
// 希望按期数升序排列
const eventScouts = sortBy(allScouts.event, scout => scout.series)
const featureScouts = sortBy(allScouts.feature, scout => scout.series)

const select = (scout: Scout) => {
  currentScout.value = scout
  switch (scout.type) {
    case 'event':
      lastEventScout.value = scout
      break
    case 'feature':
      lastFeatureScout.value = scout
      break
    default:
      break
  }
  show.value = false
}
</script>
<style scoped>
:deep(.img) {
  width: 20rem;
  height: 9.33rem;
  background-color: rgb(247, 247, 250);
  cursor: pointer;
}

:deep(.n-tabs-nav) {
  line-height: 1rem;
}

:deep(.n-tabs-tab) {
  font-size: 1rem;
  color: var(--color-secondary) !important;
}

:deep(.n-tabs-tab.n-tabs-tab--active) {
  font-weight: bold !important;
}
</style>
