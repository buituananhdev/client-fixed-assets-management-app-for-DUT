<template>
    <div
        class="notification"
        :style="{
            'border-color':
                type === 'thành công'
                    ? '#7CB969'
                    : type === 'thất bại'
                    ? '#C7422E'
                    : '#FDC571',
        }"
    >
        <div class="noti-container">
            <img class="close-icn" src="../../static/icons/close.svg" alt="" />
            <img
                v-show="type == 'thành công'"
                src="../../static/icons/success-noti.svg"
                alt=""
            />
            <img
                v-show="type == 'thất bại'"
                src="../../static/icons/failure-noti.svg"
                alt=""
            />
            <img
                v-show="type == 'cảnh báo'"
                src="../../static/icons/warning-noti.svg"
                alt=""
            />
            <p class="content">{{ content }}</p>
        </div>
        <div
            class="progress"
            :style="{
                'background-color':
                    type === 'thành công'
                        ? '#7CB969'
                        : type === 'thất bại'
                        ? '#C7422E'
                        : '#FDC571',
            }"
        ></div>
    </div>
</template>

<script>
export default {
    props: ['type', 'action', 'object', 'warning'],
    data() {
        return {
            content: this.action + ' ' + this.object + ' ' + this.type,
        };
    },
    mounted() {
        if(this.warning) {
            this.content = this.warning;
        }
    }
};
</script>

<style scoped>
.notification {
    overflow: hidden;
    /* statusmeldinger */
    position: absolute;
    z-index: 999;
    width: 350px;
    height: 70px;
    padding: 6px;
    right: 5px;
    top: 5px;
    /* White */
    background: #ffffff;
    /* Light Green */
    border: 1px solid;
    /* Resting Shadow */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: show 0.3s ease-in;
}
@keyframes show {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
.noti-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 95%;
    height: 90%;
}
header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 6px;
}
.content {
    /* Body2 */
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    /* identical to box height, or 29px */
    letter-spacing: -0.01em;
    /* Dark Blue */
    color: #273543;
}
.icn-container {
    height: 100%;
}
.progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    animation: progress_bar 3s ease;
}
@keyframes progress_bar {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}
.close-icn {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    transition: 0.2s ease;
}
.close-icn:hover {
    transform: rotate(90deg);
}
</style>