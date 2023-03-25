<template>
    <div class="notification">
        <div class="noti-container">
            <img src="../../static/icons/success-noti.svg" alt="">
            <p class="content">{{ content }}</p>
        </div>
        <div class="progress"></div>
    </div>
</template>

<script>
export default {
    props: ['title', 'content'],
};
</script>

<style scoped>
.notification {
    overflow: hidden;
    /* statusmeldinger */
    position: absolute;
    z-index: 999;
    width: 313px;
    height: 65px;
    padding: 6px;
    right: 5px;
    top: 5px;
    /* White */
    background: #ffffff;
    /* Light Green */
    border: 1px solid #7cb969;
    /* Resting Shadow */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: show .3s ease-in;
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
    background: #7CB969;
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
</style>
