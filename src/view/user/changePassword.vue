<template>
  <div style="width: 100%;position: relative;">
    <group>
      <x-input v-model="oldPassword" type="password" class="login-input" title="旧密码:">
      </x-input>
      <x-input v-model="password1" type="password" class="login-input" title="新密码:">
      </x-input>
      <x-input v-model="password2" type="password" class="login-input" title="确认密码:">
      </x-input>
      <x-button @click.native="doChange" type="primary">修改</x-button>
    </group>
  </div>
</template>

<script>
  export default {
    name: "changePassword",
    data() {
      return {
        password1: "",
        password2: "",
        oldPassword: "",
      }
    },
    methods: {
      doChange: function () {
        if (!this.password1 || !this.password2 || !this.oldPassword) {
          this.$vux.toast.show({
            text: '请输入正确的密码',
            type: "cancel",
            time: 3000,
          });
          return;
        }
        if (this.password1 !== this.password2) {
          this.$vux.toast.show({
            text: '两次新密码输入不一致!',
            type: "cancel",
            time: 3000,
          });
          return;
        }
        this.$http.post(this.API_DYNY.GMS.changePassword, {
            username: sessionStorage.getItem("user"),
            oldPassword: this.oldPassword,
            newPassword: this.password1,
          }, {emulateJSON: true}
        ).then(function (res) {
          if (res.body.result && res.body.data > 0) {
            this.$vux.toast.show({
              text: '修改成功!',
              type: "success",
              time: 3000,
            });
            this.$router.go(-1);
          }else{
            this.$vux.toast.show({
              text: '修改失败，请检查旧密码!',
              type: "cancel",
              time: 3000,
            });
          }
        }).catch(function (error) {
          this.$vux.toast.show({
            text: '修改失败，请检查旧密码!',
            type: "cancel",
            time: 3000,
          });
        });
      },
    },
  }
</script>

<style scoped>

</style>
