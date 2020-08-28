<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-inner" :style="{minHeight:height + 1 + 'px'}">
      <div :class="['scroll-pulldown',isPullingDown?'active':'']" v-if="pulldownActive" ref="pulldown">
        <div class="scroll-pulldown-inner">
          <i class="scroll-pulldown-icon"></i>
          <p>{{pulldownTip}}</p>
          <p>更新时间:{{nowTime}}</p>
        </div>
      </div>
      <slot></slot>
      <div :class="['scroll-pullup',isisPullingUpTip?'active':'']" v-if="pullupActive" ref="pulldown">
        <div class="scroll-pullup-inner">
          <i class="scroll-pullup-icon"></i>
          <p>{{pullupTip}}</p>
          <p>更新时间:{{nowTime}}</p>
        </div>
      </div>
      <div v-else style="text-align:center">{{tiptxt}}</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props: {
        /**
         * 滚动区域高度
         */
        height: {
            type: [String,Number],
            default: 0,
            required: true
        },
        /**
         * 1 会非实时（屏幕滑动超过一定时间后）派发scroll 事件。
         * 2 会在屏幕滑动的过程中实时的派发 scroll 事件。
         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
         */
        probeType: {
            type: Number,
            default: 0
        },
        /**
         * 是否有回弹动画
         */
        bounce: {
            type: Boolean,
            default: true
        },
        /**
         * 点击列表是否派发click事件
         */
        click: {
            type: Boolean,
            default: true
        },
        /**
         * 是否开启横向滚动
         */
        scrollX: {
            type: Boolean,
            default: false
        },
        /**
         * 是否启用下拉刷新
         */
        pulldownActive: {
            type: Boolean,
            default: true
        },
        /**
         * 是否启用上拉加载更多
         */
        pullupActive: {
            type: Boolean,
            default: true
        },
        tiptxt: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isPullingDown: false,
            isPullingUp: false,
            isisPullingUpTip: false,
            pulldownTip: '下拉刷新数据',
            pullupTip: '上拉加载更多'
        }
    },
    computed: {
        nowTime() {
            var myDate = new Date()
            return myDate.getHours() + ':' + myDate.getMinutes()
        }
    },
    mounted() {
        var _this = this
        this.$nextTick(() => {
            this.$refs.wrapper.style.height = this.height + 'px'
            this._initScroll()
        })
    },
    methods: {
        _initScroll() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                bounce: this.bounce,
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX,
                pullDownRefresh: this.pulldownActive,
                pullUpLoad: this.pullupActive
            })

            this.scroll.on('touchEnd', pos => {
                if (this.isPullingUp && this.pullupActive && this.scroll.y <= this.scroll.maxScrollY - 60) {
                    this.isisPullingUpTip = true
                    this.pullupTip = '数据正在加载'
                    this.$emit('pullingUp')
                   // console.log(2)
                }
            })

            this.scroll.on('scroll', (pos) => {
                if (!this.isPullingDown && this.pulldownActive) {
                    this.pulldownTip = '释放刷新数据'
                }
            })

            this.scroll.on('scrollEnd', () => {
                if (this.isPullingDown && this.pulldownActive) {
                    this.isPullingDown = false
                    this.pulldownTip = '下拉刷新数据'
                }
                if (this.isPullingUp && this.pullupActive) {
                    this.isPullingUp = false
                    this.isisPullingUpTip = false
                    this.pullupTip = '上拉加载更多'
                    this.scroll.finishPullUp()
                }
                this.scroll.refresh()
            })

            if (this.pulldownActive) {
                this._initPullDownRefresh()
            }

            if (this.pullupActive) {
                this._initPullUpLoad()
            }
        },
        _initPullDownRefresh() {
            this.scroll.on('pullingDown', () => {
                this.isPullingDown = true
                this.pulldownTip = '正在刷新数据'
                this.$emit('pullingDown')
                this.scroll.finishPullDown()
            })
        },
        _initPullUpLoad() {
            this.scroll.on('pullingUp', () => {
                this.pullupTip = '释放加载数据'
                this.isPullingUp = true
            })
        },
        disable() {
            // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable()
        },
        enable() {
            // 代理better-scroll的enable方法
            this.scroll && this.scroll.enable()
        },
        refresh() {
            // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            // 代理better-scroll的scrollToElement方法
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    watch: {
        height() {
            this.$refs.wrapper.style.height = this.height + 'px'
            this.scroll && this.scroll.refresh()
        }
    },
    destroyed() {
        this.$refs.scroll && this.$refs.scroll.destroy()
    }
}
</script>

<style>
.scroll-wrapper {
    overflow: hidden;
}
.scroll-inner {
    position: relative;
}
.scroll-pulldown {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: translateY(-100%);
    text-align: center;
}
.scroll-pulldown-inner {
    position: relative;
    display: inline-block;
    padding: 5px;
}
.scroll-pulldown-inner p {
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    margin: 0;
    padding: 0;
}
.scroll-pullup {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
    text-align: center;
}
.scroll-pullup-inner {
    position: relative;
    display: inline-block;
    padding: 5px;
}
.scroll-pullup-inner p {
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    margin: 0;
    padding: 0;
}
.scroll-pulldown-icon,
.scroll-pullup-icon {
    width: 32px;
    height: 32px;
    position: absolute;
    left: -40px;
    top: 50%;
    margin-top: -16px;
}
.scroll-pulldown-icon {
    background: url('data:image/png;base64,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');
    background-size: 32px;
}
.scroll-pullup-icon {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHB0lEQVR4Xu2bV6glRRCGvzXnnCMmFAT1wSxizgnBrKCY04M5PZhezIqgYg6IWRQVI6KCYlZUUMyYc06YlU+6pbd37pmecM5F7xYsu+yZqe76u7q66q+eSUxwmTTB7WcqAFM9YPgIzACsA6wHLAwsBCwALAgsAvwBfAp8DHwR/v0B8BjwKPDbMKc4rC0wDbAZsC+wOTBLSyN+Au4BrgLuA/5sqWfM1/oGYCbgAOAoYLGeJ6tXnA1cDPzSl+6+AJgurPZJwcX7ml+Vnk+AU4DLgd+7DtQHANsA5wHLDJjMW8BT4c/TwPPAr9nzMwKrAGsBqwJrFug8HLirCwhdAJgWOD24e9UcNPA64AzgtZaTXBE4AtgDMJhWybnA0W3jQ1sAZgduBTatmNGPwCVhvxrZ+xBPiyNDfJm1QuEDwA7A900HawOAwc2I7OqkYsS+EDgzHGdN51Ly/HzAMcAhFSfLy+HEMVgWS1MAXAn38KLZCLq4x967xSN3e3BJ4H5g+UzNh8DqwEel6psAMBfwZMWgdwM7A7r+KMWtcBOwVcViGEC/KZlMKQDTh6xsjUzpZcCBbQNQyQRrnjHhugA4KHvOE2fdkiyyFICrgT2zQa4IZ38PdnRWYU6wT6bF7HHvOs0lAOjeN2aK7gW2HseVz+3SE8wHtsx+2LVi7pM9UgeArv9OKFriiwY8E5Uf6tAd8e+zAc9mMcqguNSgrVAHgEeOiUwUc/CVOyQ2KSaCaCLl2X1aOF26Yuap8CJgVhnluMyGYg+YE3gPmCN5w1z/1K6zDDmEpe7cQZfA6r4P9aD7xFArRFXfAh6b/j2FDPIAV0X0ophgLNtDJWa+r6HR+NS7+gDB1X8DWDyZu7ac0AQA9/6XgClvFFNR8+4ushrwYOZVqT49YeNAhnQZx7laOkdxm5lF5gXYmJzgtsAdiQIDnllg41w70bF2yN4MVoPElNqsUkaorbhwBsB0AbcD7swVjrUFrOJ2Sx6+KOTfbSek8a78zIUK+gDBuuTgZLwbMpv++akKAP/va8AgGMV9a3RtI+sHWqvOeN0/jd6CsGHgENqMu1I2Z1PjeYC/UmVVAJhHP5E8JBi+2EY2CQlKaph6ZHQ8UVLZIjwruxTFrWdMMLVtI5Ks8yYvSrZYz/wrVQBILljSRrkF2KnF6BpvoWRATcWz//h8JYI3GntuAyRb+gDhZmDHRNexmW2VW8ACRzY3igTnOQ0BsEK7fYDxqpvMFZPtKLHhxNPFaesJsknp3K0Z9qvzgIcB920UaW1r71LZKBAmqSv7blz5qGcsAPx9d+DaChDsLcgnloqnieRNlEeADeoAeDMjIyU73y4dMeyxvGzOjR/kAXEoKzkrzlSsS8ztS8Vn07n778nI26oY8HlIGuIgBpGvSkcMAdRAGqXK+BIAfMY63yM4SlMADN4mdFEMivPXecDP2XFkQGrSkdHFLE0/A84Pf6rwG7QF0ufl/9Qj52c6a2AtFctkW29RPGpt3vwrVR6QAyAdPYz+XCkApcZWPecJlKa/RQC4cqmbWLQU8WsNZzoKAOQxzWOiuL1tzA70ACspq74oTYNgKQ6jACAPgnaoUtsq84D8GDRDS4+SUgPrnhsFAB7h0ndRtM30eqAH2NXZP3mmTSJUZ7y/jwKAPBG6NHSXBgKgwWclFpiVSYz2LaMAwL5Bmsab5qc8QeUWyIsh6+q+e/2j8gDnLo8RpagYqiqHJUJf6tkFhu0BeTksJ+iJVlsOa2dOiEguHPofA8COkUlUlGJCxBdySkwqzIZoF0osx2+YHtCZEqsiRY2o3gTpS4YJQB79LaetC6bIaAfR4hYxEghR3geW64EWj/qGBYDs0+vAEsncbe6kFP/AYzD+KCdovz/lBqWyTu7JBWy6RO5ecNMJdxnC+aV023dBd+PGiJMQNZsKUSwmJEhf7TLD8K40tV4Wx0lp+LbqVwBeyKpZK8jUhsl01/UGdSdJhPQs/S81R70psvSgbVsHgGhVtcetyT0pmvAEbVe15L2htcfj4FUXJKbIq0tmOqRnqi5IXAPsVTdeiQeow2NRQtEOTypXBpZ1vDzBlZfFzm+CPB6I3VoipxQAjR50SWqXcbgwMdJLUnHVx7om56kgbyBpOQoZl2ty0bC6i5IebU1Y5CaA2eK2pLUuya/gvxJurloBFkuTLZAqNde2hWXfLhfvCxog5RT6vCorT+GVvKomq53n7dtsw7YAaLR0ueTCYWPALRt7fUh2ulyW1nA7RXmPMQ5rfeIzrQJxFwDiBEquy5tM2ZW1y/sM8FzNdXlvkthdqruCP67X5dOFn9AfTKRATNhPZvIwED+a8vqqx+OE+WiqKh6mn82ZR/i5XPxsLnZp7Eb9rz6bKz6Hx/vBPk6B8bah0/hTAegE3//g5b8B669zUIvJBD0AAAAASUVORK5CYII=');
    background-size: 32px;
}
.scroll-pulldown.active .scroll-pulldown-icon,
.scroll-pullup.active .scroll-pullup-icon {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEf0lEQVR4Xu2bXchVRRSGn88SQUuNVCKUAhUlxL9CFKXMi4QQUkNFBH9S8D/6QRErVMRCQcsKMtBSqRAV9EYwQ0xUsoIUQy8MJLEuMhG7sEgk44U5eNjf7L1nz95nz/m+s9ftWTNrrXfWXjPzrjlttLi0tXj8VABUGdDiCFSfQIsnQNAi2A+YCzwE/Ad8A3xX9oKE+AR6AFuBV4CukYDPAsuAc2UBUTYA3YDvgREJAf4LPGf0Go5D2QBsA153iOoKMNh8Gg7q/iplAtALuAE86OjudOCQo663WpkAvAQczuDpV8CcDPpeqmUCsAL4KIOXZ4AJGfS9VPMCoCq+GHgb6Guq9wngQ+BaxKOFwM4MXh4BpmTQ91LNA0BP4DjwjMXybUApr99rMgj4JYOXa4DNGfS9VPMA8DXwQoJVgTAauFyncxJ41sHTv4EngT8tulOB983vt4APgA0Oc1pVfAEYD5x2MLoHmF+n9zTwrTn9JQ1fBOyyKEwE9IlFZTvwmoM/7VR8AVBqrnYwqBV6JKI3DDgADI35dN4EPo2ZW+DpkGQTr1i8BgFfZNiiugP/RDzuAiiVFwAPA/eAYybwmwnA/go8EfP78ya7HNblvoovAFuAVQ6WbBngMCxWRecIFdfgGaD9+ZRDJHuBeQ56riojYy5KKoLrXSep1/PNAM1xFJicYNS2C/j4GB2jQqhgVQuuml1AO4GX5AFA5wDd4cdYLF8y113d/Jpa8gCgwHQS1Jb1oilmdwFtfV+WcZMrAtm8ABThQ9A5KgCCwt8ExrNmQH9AlxodXM4DfzVBDLlccAVAFV90lq60NbkDvAtsAlT8mkF07B4AXHB1xgWAB8zFZ2zMpAJAfEBIURwbgbeME7p2i3sUp5AoLgDovP5ZwixicfVZ/JZmrIG/LwE+scyfej9wAWA/MCPF+bXAew0MMG3q64aRiuqpzzAuabALAC4khri+V9O8bNDv6jD9ETO3iBU1YmLFBYB9wKwU50VGiJQIJaLbH7UYLyQDJkW4vagd1YCBwO+hojfE7I5G1QDN+zGw3GJA54GlCQxOmZhoi14JDDHb4DuGZMm9C9QmUCdXk6riS340tJhoqg4rLjWgwwbn4ngFgAtKnVmnyoDOvLousRWZAWplibcvS3oDot1zSREAqMHxOSCHJLVeXW7nYiLTqXNdUfbyAhDXq1MDY1qupbEPFti2VyOl9wZr7iV1akROFJ0FTdMbrAGQ5FDqXdwjQwSo3hrZZJSh6TJNm/cTKLxXl+J9nD1xk7UaVCoAqvwiR6Or4tqrU3ur9mbgJwfP43qDor+82mN5M0A+yyn16lQQtQ3udnQm+sZA7XG9CtPdPkmi9hS4bHpJEQD4GH4ZOGgZqIcTM30m9B0TCgA9nhLRYhO9NkvLAt94240LBcBF4KmYKIYDPxcWYcpEoQCIY5hEbj5eZmc5FAB9zCo/VrdA+s/AbEA0fGkSCgAFqJPiG4AOMCJU9Szuh9IiN4ZCAlB2rFZ7FQBNsQwBnagyICD4TWG6yoCmWIaATvwPfH2uQeu0Y7oAAAAASUVORK5CYII=');
    background-size: 32px;
    animation: circle 1.5s infinite linear;
    -webkit-animation: circle 1.5s infinite linear;
}
@keyframes circle {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes circle {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
</style>


