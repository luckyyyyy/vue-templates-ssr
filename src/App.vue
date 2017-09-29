<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  data() {
    return {
      entryURL: '',
      wxInit: false,
    };
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    getLocationUrl() {
      return window.location.href; // 服务器会处理
    },
  },
};
</script>
