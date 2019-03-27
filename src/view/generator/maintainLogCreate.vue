<template>
    <div style="width: 100%">
        <group>
            <x-textarea title="保养内容" v-model="content" rows="16" style="margin-bottom: 15px;"></x-textarea>
        </group>
        <commit-button cancelText="返回" commitText="提交" style="margin-top: 15px;" @cancel="cancel"
                       @commit="submit"></commit-button>
    </div>
</template>

<script>
    import CommitButton from '../../components/CommitButton'

    export default {
        name: "maintainLogCreate",
        components: {CommitButton},
        data() {
            return {
                generatorNo: this.$route.query.generatorNo,
                username: sessionStorage.getItem("user"),
                content: "",
            }
        },
        methods: {
            submit() {
                let params = {generatorNo: this.generatorNo, username: this.username};
                let that = this;
                if (!that.content) {
                    that.$vux.toast.show({
                        text: '请输入保养内容!',
                        type: 'warn'
                    });
                    return;
                }
                params.content = this.content;
                that.$http.post(that.API_V2.maintainLog.create.default, params, {emulateJSON: true}).then(res => {
                    if (res.data.result && res.data.data) {
                        that.$vux.toast.show({
                            text: '提交成功!',
                            type: "success",
                            time: 3000,
                        });
                        that.$router.go(-1);
                    }
                }).catch(function (error) {
                    that.$vux.toast.show({
                        text: '提交失败,请稍后重试!',
                        type: 'warn'
                    });
                });
            },
            cancel() {
                this.content = "";
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped>

</style>