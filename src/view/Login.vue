<template>
  <div>
    <x-header :left-options="{showBack: false}">油机管理系统-登录</x-header>
    <div class="login-title-div">

    </div>
    <group class="login-group">
      <x-input v-model="username" type="text" class="login-input">
        <img slot="label" class="login-input-img" style="display:block;"
             src="../assets/images/username.png" width="24"
             height="24">
      </x-input>
      <x-input v-model="password" type="password" class="login-input">
        <img slot="label" class="login-input-img" style="display:block;"
             src="../assets/images/jianpan.png" width="24"
             height="24">
      </x-input>
      <!--<x-button @click.native="style = 'color:red;'" type="primary"></x-button>-->
      <x-button @click.native="login" type="primary">登录</x-button>
    </group>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        username: "",
        password: "",
      }
    },
    mounted: function () {
      let username = localStorage.getItem('username');
      let password = localStorage.getItem('password');
      if (username && password) {
        this.password = password;
        this.username = username;
        this.login();
      }
    },
    methods: {
      login: function () {
        if (!this.password || !this.username) {
          this.$vux.toast.show({
            text: '请输入正确的账号密码',
            type: "cancel",
            time: 3000,
          });
          return;
        }
        this.$http.post(this.API_DYNY.GMS_DOMAIN + "ems/users/login.do", {
          username: this.username,
          password: this.password
        }, {emulateJSON: true}).then(res => {
          if (res.body.result == "true") {
            let user = res.body.username;
            localStorage.setItem('user', user);
            localStorage.setItem('username', this.username);
            localStorage.setItem('password', this.password);
            sessionStorage.setItem('user', user);
            sessionStorage.setItem('userLevel', res.body.userlevel);
            sessionStorage.setItem('usercus', res.body.usercus);
            this.$router.push('/');
          } else {
            this.$vux.toast.show({
              text: '登录密码或用户名错误',
              type: "cancel",
              time: 3000,
            })
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login-input-img {
    background-color: mediumseagreen;
    margin-right: 10px;
  }

  .login-input {
    padding: 15px;
  }

  .login-title-div {
    height: 20%;
    width: 100%;
  }

  .login-group {

  }
</style>
