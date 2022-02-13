<template>
  <es-button @click="show = true">切换卡池</es-button>
  <n-modal v-model:show="show">
    <div class="dialog">
      <div class="title"><span style="cursor: pointer" @click="show = false">╳</span></div>
      <n-tabs default-value="event" type="segment">
        <n-tab-pane name="event" display-directive="show:lazy" tab="活动">
          <es-gallery>
            <es-image
              v-for="scout in allScouts.event"
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
              v-for="scout in allScouts.feature"
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
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import EsButton from './common/EsButton.vue'
import EsImage from './common/EsImage.vue'
import {NModal, NTabs, NTabPane} from 'naive-ui'
import {ref} from 'vue'
import {Scout, useScoutStorage} from '../../composables/useScouts'
import EsGallery from './common/EsGallery.vue'
import {currentScout, lastEventScout, lastFeatureScout} from './logic/store'

const show = ref(false)

const allScouts = useScoutStorage()

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
.dialog {
  background: white;
  position: absolute;
  top: 4rem;
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
  width: 20rem;
  height: 9.33rem;
  background-color: rgb(247, 247, 250);
  cursor: pointer;
}

::v-deep .n-tabs-nav {
  line-height: 1rem;
}

::v-deep .n-tabs-tab {
  font-size: 1rem;
  color: var(--color-secondary) !important;
}

::v-deep .n-tabs-tab.n-tabs-tab--active {
  font-weight: bold !important;
}
</style>
