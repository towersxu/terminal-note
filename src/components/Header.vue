<template>
  <header class="bar bar-nav header-nav" v-if="!headerOption.hide">
    <a class="icon icon-left pull-left" v-if="headerOption.goBack"></a>
    <h1 class="title" v-if="headerOption.title">{{headerOption.title}}</h1>
    <slot></slot>
  </header>
</template>
<script>
export default {
  props: {
    headerOption: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
// @import '../assets/less/variables.less';
//
//   .header-nav{
//     background: @color-primary;
//   }
//   .header-nav .title{
//     color: #fff;
//   }
//   .header-nav .icon{
//     color: #fff;
//   }
//   .bar .button-link{
//     color: #fff;
//   }
</style>
