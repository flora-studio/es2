<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <div>
      <div class="page-title">卡片&卡池配置</div>
      <div class="page-main">
        <n-menu v-model:value="menu" :options="menuOptions" />
        <div class="view">
          <card-config-page v-show="menu === 'Card'" />
          <pool-config-page v-show="menu === 'Pool'" />
        </div>
      </div>
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider, NMenu, zhCN, dateZhCN } from "naive-ui"
import {computed, ref} from "vue"
import CardConfigPage from "./CardConfigPage.vue"
import PoolConfigPage from "./PoolConfigPage.vue"

const menu = ref('Pool')
const menuOptions = [
  {
    label: '卡片配置',
    key: 'Card',
  },
  {
    label: '卡池配置',
    key: 'Pool'
  }
]
</script>
<style scoped>
.page-title {
  background-color: black;
  color: white;
  padding: 12px;
}

.page-main {
  display: flex;
}

.n-menu {
  flex: 0 0 125px;
}

.view {
  flex-grow: 1;
  border-left: 1px solid #ddd;
  min-height: calc(100vh - 80px);
  padding: 12px;
}
</style>
