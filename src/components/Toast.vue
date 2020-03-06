<template>
  <div class="mask">
    <div class="Toast">
      <img v-if="ToastOption.icon" :src="icon[ToastOption.icon]">{{ToastOption.text}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: ["ToastOption"],
    data() {
      return {
        icon: {
          loading: require("@/images/gear.gif")
        }
      }
    },
    mounted() {

    },
    methods: {

    },
  }
</script>

<style scoped>
.Toast{position:fixed;top:50%;left:50%;z-index:999;float:left;padding:.065rem .1rem;border-radius:.025rem;background:rgba(0,0,0,.5);color:#fff;font-size:.08rem;line-height:.1rem;transform:translate(-50%,-50%)}
.Toast img{margin:0 .05rem 0 -.025rem;width:.1rem;height:.1rem;object-fit:contain;-o-object-fit:contain}
</style>