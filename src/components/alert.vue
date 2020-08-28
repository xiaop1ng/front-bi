<!--
    属性:
    isShow: Boolean, alert组件是否可见，使用 v-model 绑定
    title： 弹窗标题
    content:  alert 弹窗主体文字内容
    sure-text: 确认按钮的显示文字
    mask:  Boolean, 是否需要显示遮罩层，默认：true
    事件: 
    @onShow：弹窗显示时触发
    @onHide：弹窗隐藏时触发
    @onSure: 点击确定按钮时触发
    插槽:
    slot: 默认插槽 弹窗主体内容, 使用slot时，slot内容将替换弹窗中间部分(包括提示图标)，属性content将无效.
-->
<template>
    <div class="alert_box" v-if="isShow">
        <div class="alert_content">
            <div class="alert_tit">{{title}}</div>
            <div class="alert_main">
                <slot><p class="tips_text">{{content}}</p></slot>
            </div>
            <div class="alert_bot alert_btn" @click="_onSure">{{sureText}}</div>
        </div>
        <div class="mask_bg" v-if="mask" @click="_onHide"></div>
    </div>
</template>
<script>
export default {
    name: 'hi-confirm',
    model: {
        prop: 'isShow',
        event: 'change'
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '提示'
        },
        content: {
            default: '是否删除此内容？'
        },
        sureText: {
            default: '确定'
        },
        mask: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        isShow (val) {
            this.$emit(val ? 'onShow' : 'onHide')
        }
    },
    mounted (){
        this.isShow && this.$emit('onShow')
    },
    methods: {
        _onHide () {
            this.$emit('change', false)
        },
        _onSure () {
            this.$emit('onSure')
            this.$emit('change', false)
        },
        _onCancel () {
            this.$emit('onCancel')
            this.$emit('change', false)
        }

    }
}
</script>
<style>
</style>