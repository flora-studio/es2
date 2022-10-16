<template>
  <es-button @click="show = true">版本&答疑</es-button>
  <es-dialog v-model:show="show" top="4rem">
    <div class="inner">
      <a href="#" /><!-- 处理焦点的问题 -->
      <h3>最近更新</h3>
      <p>2022/10/16 更新日服最新池、7周年卡池、国服限定池</p>
      <p>2022/10/02 更新日服最新池、7周年卡池</p>
      <p>2022/09/18 更新日服最新池</p>
      <h3>常见问题</h3>
      <p>Q: 会继续更新吗？</p>
      <p>A: 会根据 Wiki 数据继续更新。</p>
<!--      <p>Q: 我在模拟器里好非/好欧？</p>-->
<!--      <p>A: 模拟器的抽卡概率是根据公开的规则和个人体感调整而来，实际游戏中可能有更细微的机制控制歪得不离谱。模拟器的抽卡结果仅供参考。</p>-->
      <p>Q: 图片加载不出来？</p>
      <p>A: 图片主要引用自外网 Wiki，我们也很难控制。加载失败可能是访问外网的网络波动，可以多尝试。也可能是手机浏览器的兼容性问题（例如低版本 iOS 等）。</p>
      <p>Q: 能不能增加抽卡动画/BGM 等？</p>
      <p>A: 由于用爱发电的服务器资源有限，加入这些多媒体资源会对流量和带宽造成较大压力，也会拖慢网站加载速度。因此目前暂不考虑添加。后续如有时间会考虑做个 Android APP 加入。</p>
      <p>Q: 有下载版吗？</p>
      <p>A: 可以通过各手机浏览器的【添加到桌面】功能，获得类似 APP 的体验。</p>
      <h3>关于抽卡模拟器</h3>
      <p>抽卡模拟器项目仅供个人学习与娱乐用途。所有游戏素材版权属于乐元素官方，卡池数据和图片主要来自偶像梦幻祭英文、日文 Wiki，感谢维护者们的辛勤付出。若官方/Wiki 人员认为有任何不妥之处，请联系我们，我们将立即处理。</p>
      <h3>关于我们</h3>
      <p>FloraStudio 专注于游戏、二次元等领域的创作与分析。欢迎关注我们：</p>
      <p>Bilibili: <a href="https://space.bilibili.com/688429881" target="_blank" referrerpolicy="no-referrer">@FloraStudio</a>
        &nbsp;/&nbsp;微博: <a href="https://weibo.com/u/6714705016" target="_blank" referrerpolicy="no-referrer">@芙露拉_FloraStudio</a>
        &nbsp;/&nbsp;公众号: <a href="https://mp.weixin.qq.com/s?srcid=0219sLdXtFaq6BqBLxfFwRqL&scene=23&mid=2247483832&sn=20c5774f3c5bffa7f801e93492c901a0&idx=1&__biz=MzUyNzkzOTA0MQ%3D%3D" target="_blank" referrerpolicy="no-referrer">芙露拉ACG研究社</a></p>
    </div>
  </es-dialog>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import EsButton from './common/EsButton.vue'
import EsDialog from './common/EsDialog.vue'

// 每次更新时要 +1
const versionCode = 3
let initialShow = false
try {
  const savedVersion = Number(localStorage.getItem('update_log_ver') || '0')
  initialShow = versionCode > savedVersion
  localStorage.setItem('update_log_ver', String(versionCode))
} catch (e) {
  // ignore
}

const show = ref(initialShow)
</script>
<style scoped>
.inner {
  padding: 1rem;
  height: 42rem;
  overflow-y: auto;
}

.inner::-webkit-scrollbar {
  display: none;
}

h3 {
  font-size: 2rem;
  margin: 0;
}

p {
  font-size: 1.5rem;
  margin: 1rem 0;
}
</style>
