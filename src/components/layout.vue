<template>
  <div class="app">
    <header class="header">
      <h1 class="header__title">运营平台</h1>
      <nav class="header-nav">
        <img class="header-nav__avatar" :src="user.avatar">
        <span class="header-nav__name">{{ user.nickname }}</span>
        <router-link class="header-nav-item" :to="{ name: 'logout' }">退出</router-link>
      </nav>
    </header>
    <section class="layout">
      <el-menu class="layout-menu" @select="onSelect" :router="false" theme="dark" :default-active="active" mode="vertical" width="140px">
        <template v-for="item of sidebar">
          <template v-if="item.group">
            <el-menu-item-group :key="item.group">
              <span slot="title">{{ item.group }}</span>
              <template v-for="gitem of item.items">
                <template v-if="gitem.sub">
                  <el-submenu :index="gitem.name" :key="gitem.name">
                    <span slot="title">{{ gitem.item }}</span>
                    <el-menu-item :key="sub.name" v-for="sub of gitem.sub" :index="sub.name">{{ sub.item }}</el-menu-item>
                  </el-submenu>
                </template>
                <el-menu-item :key="gitem.name" v-else :index="gitem.name">{{ gitem.item }}</el-menu-item>
              </template>
            </el-menu-item-group>
          </template>
          <template v-else-if="item.sub">
            <el-submenu :index="item.name" :key="item.name">
              <span slot="title">{{ item.item }}</span>
              <el-menu-item :key="sub.name" v-for="sub of item.sub" :index="sub.name">{{ sub.item }}</el-menu-item>
            </el-submenu>
          </template>
          <el-menu-item :key="item.name" :class="{ line: item.line }" v-else :index="item.name">{{ item.item }}</el-menu-item>
        </template>
      </el-menu>
      <router-view tag="section" class="layout-main"></router-view>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      sidebar: [
        { item: '首页', name: 'home' },
        {
          group: '差评',
          items: [
            {
              item: '微信相关',
              name: 'wechat_chaping',
              sub: [
                { item: '关键词回复', name: 'wechat_chaping_keyword' },
                { item: '底部菜单', name: 'wechat_chaping_menu' },
              ],
            },
            {
              item: '活动相关',
              name: 'wechat_chaping_event',
              sub: [
                { item: '众测', name: 'wechat_chaping_event_test' },
                { item: '教师节活动', name: 'wechat_event_chaping_menu' },
                { item: '校园行活动', name: 'wechat_event_chaping_menu' },
              ],
            },
          ],
        },
        {
          group: '史塔克',
          items: [
            {
              item: '微信相关',
              name: 'wechat_shitake',
              sub: [
                { item: '关键词回复', name: 'wechat_shitake_keyword' },
                { item: '底部菜单', name: 'wechat_shitake_menu' },
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState('user', ['user']),
    active() {
      let active = this.$route.name;
      active = this.$route.matched.reduceRight((preValue, item, index, array) => {
        return item.meta.sidebar || preValue;
      }, active);
      return active;
    },
  },
  methods: {
    onSelect(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss">
@import 'layout.scss';
</style>
