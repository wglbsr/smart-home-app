<template>
  <div style="margin-bottom: 100px;">
    <box gap="10px 10px">
      <flexbox class="container">
        <flexbox-item>
          <x-button class="button-close" @click.native="cancel">{{cancelText}}</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" class="button-commit" @click.native="commit">{{commitText}}</x-button>
        </flexbox-item>
      </flexbox>
    </box>
  </div>
</template>

<script>
  export default {
    name: "CommitButton",
    props: ['cancelText', 'commitText'],
    methods: {
      cancel: function () {
        this.$emit("cancel");

      },
      commit: function () {
        this.$emit("commit");
      }
    }
  }
</script>

<style scoped>
  .container {
  }

  .button-commit, .button-close {
  }

  .button-commit {
    float: right;
  }

  .button-close {
    float: left;
  }
</style>
