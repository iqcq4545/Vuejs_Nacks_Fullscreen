<template>
  <div>
    <router-view></router-view>
    <Toast v-if="ToastOption.isShow" :ToastOption="ToastOption"></Toast>
    <Confirm v-if="ConfirmOption.isShow" :ConfirmOption="ConfirmOption"></Confirm>
    <div class="hide">
      <img src="@/images/gear.gif" />
    </div>
  </div>
</template>

<script>
  console.log('App.vue');
  import Toast from "@/components/Toast";
  import Confirm from "@/components/Confirm";

  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload,
        Toast: this.Toast,
        Confirm: this.Confirm
      }
    },
    data() {
      return {
        isReload: true,
        ToastOption: { text: undefined, icon: undefined, timer: undefined, isShow: false },
        ConfirmOption: { text: undefined, icon: undefined, action: undefined, isShow: false },
      }
    },
    components: {
      Toast: Toast,
      Confirm: Confirm
    },
    created() {

    },
    watch: {

    },
    mounted() {
      window.onresize = function () { fontSize(); }
    },
    methods: {
      reload() {
        this.isReload = false;
        this.$nextTick(function () {
          this.isReload = true;
        })
      },
      Toast(option, duration = 2000) {
        var that = this,
          k = ["text", "icon"];
        if (duration === 0) {
          that.ToastOption.isShow = false;
          return false;
        }
        return new Promise((reslove, reject) => {
          clearTimeout(that.ToastOption.timer);
          for (var i in k) {
            that.ToastOption[k[i]] = option[k[i]];
          }
          that.ToastOption.isShow = true;
          that.ToastOption.timer = setTimeout(function () {
            that.ToastOption.isShow = false;
            reslove(true);
          }, duration);
        });
      },
      Confirm(option) {
        var that = this,
          k = ["text", "action"];
        for (var i in k) {
          that.ConfirmOption[k[i]] = option[k[i]];
        }
        that.ConfirmOption.isShow = true;
      },
    }

  }
</script>

<style scope>
  @import "../css/app.css";
</style>