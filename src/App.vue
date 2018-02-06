<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>

    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
    <player></player>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'
  import Player from 'components/player/player'
  export default {
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    // dynamically set transition based on route change
    watch: {
      '$route' (to, from) {
        // console.log(to, from)
        const toDepth = to.meta.key
        const fromDepth = from.meta.key
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    components: {
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .child-view
    position: absolute
    transition: all .5s cubic-bezier(.55,0,.1,1)
  .slide-left-enter, .slide-right-leave-active
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  .slide-left-leave-active, .slide-right-enter
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);

</style>
