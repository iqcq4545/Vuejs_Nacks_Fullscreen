<template>
  <div class="full">
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
          loading: require("@/images/gear.gif"),
          yes: require("@/images/yes.png"),
          no: require("@/images/no.png"),
          query: require("@/images/query.png"),
          warn: require("@/images/warn.png"),

        }
      }
    },
    mounted() {

    },
    methods: {

    },
  }
</script>

<style>
  .Toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    float: left;
    padding: .05rem .1rem .05rem .08rem;
    border-radius: .02rem;
    background: rgba(33, 54, 88, .66);
    box-shadow: 0 0 .05rem 0 #588fe8 inset;
    border:1px #588fe8 solid;
    color: #fff;
    font-size: .08rem;
    line-height: .1rem;
    transform: translate(-50%, -50%)
  }

  .Toast img {
    padding: 0 .05rem 0 0;
    width: .1rem;
    height: .1rem;
    object-fit: contain;
    -o-object-fit: contain
  }
</style>