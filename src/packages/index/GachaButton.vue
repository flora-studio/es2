<template>
  <div class="btn">
    <div class="top">招募</div>
    <div class="bottom">{{ '💸\u3000 1' }}</div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.btn {
  position: absolute;
  right: 60px;
  bottom: 20px;
}

.top {
  width: 100px;
  height: 50px;
  border-top-left-radius: 12px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  /*font-size: large;*/
  color: white;
  text-shadow: 1px 1px 1px #2D3636, 1px -1px 1px #2D3636, -1px 1px 1px #2D3636, -1px -1px 1px #2D3636;
  background: linear-gradient(135deg, white 5%, yellow);
}

.bottom {
  width: 100px;
  height: 18px;
  box-sizing: border-box;
  color: white;
  line-height: 18px;
  padding-left: 24px;
  font-weight: bold;
  font-size: 12px;
  background-color: #3d444a;
}
</style>
