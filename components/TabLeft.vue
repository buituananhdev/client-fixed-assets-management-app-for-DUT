<style scoped>
* {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

.page-left {
    width: 255px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #363740;
    border-left: #8c8d90 solid 1px;
}

.logo-container {
    widows: 100%;
    padding-top: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-img {
    width: 70px;
    height: auto;
}

.list-features {
    padding: 0;
    margin-top: 60px;
}

.list-features li {
    cursor: pointer;
    color: #ffffff;
    display: flex;
    gap: 24px;
    padding: 18px 23px;
    list-style-type: none;
    font-style: normal;
    letter-spacing: 0.5px;
    line-height: 20px;
    margin-bottom: 1px;
}

.list-features li:hover {
    background: #4c4e5a;
}

.isActive {
    background: #4c4e5a;
}

.feature-name {
    /* Regular/16px */
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    /* identical to box height */
    letter-spacing: 0.2px;
    color: #dde2ff;
}

.collapse-sidebar {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.collapse-sidebar:hover {
    background: #4c4e5a;
}

.to-left-side,.to-right-side {
    width: 100%;
    display: flex;
    gap: 12px;
    padding: 12px;
}

.to-left-side p {
    color: #ffff;
}

.to-right-side{
    margin-right: 15px;
    justify-content: flex-end;
}

.isClose{
    transform: translate(-195px);
    transition: all .3s ease;
}
.isOpen{
    transform: translate(0);
    transition: all .3s ease;
}
.display-none{
    display: none;
}
</style>
<template>
    <div class="page-left" :class="{'isClose' : isCloseTab, 'isOpen' : !isCloseTab}">
        <div class="page-left-container">
            <div class="logo-container">
                <img
                    class="logo-img"
                    src="../static/images/logo-dut.jpg"
                    alt=""
                />
            </div>
            <ul class="list-features">
                <li class="isActive">
                    <img src="../static/icons/apple.svg" alt="" />
                    <p class="feature-name">Tài sản</p>
                </li>
                <li>
                    <img src="../static/icons/apple.svg" alt="" />
                    <p class="feature-name">Tài sản đã thanh lý</p>
                </li>
                <li>
                    <img src="../static/icons/cart-plus.svg" alt="" />
                    <p class="feature-name">Thêm tài sản</p>
                </li>
                <li>
                    <img src="../static/icons/pie-chart.svg" alt="" />
                    <p class="feature-name">Thống kê</p>
                </li>
            </ul>
            <div class="collapse-sidebar" >
                <span class="to-left-side"  @click="checkTab('close')">
                    <img
                        class="chevron-left"
                        src="../static/icons/chevron-double-left.svg"
                        alt=""
                    />
                    <p>Collapse sidebar</p>
                </span>
                <span class="to-right-side display-none" @click="checkTab('open')">
                    <img src="../static/icons/chevron-double-right.svg" alt="">
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCloseTab: false,
        }
    },
    methods: {
        checkTab(key) {
            switch(key){
                case 'close':
                    this.isCloseTab = true;
                    document.querySelector('.to-left-side').classList.add('display-none');
                    document.querySelector('.to-right-side').classList.remove('display-none');
                    document.querySelector('.list-features').classList.add('display-none');
                    this.$emit('closeTab');
                    break;
                case 'open':
                    this.isCloseTab = false;
                    document.querySelector('.to-right-side').classList.add('display-none');
                    document.querySelector('.to-left-side').classList.remove('display-none');
                    document.querySelector('.list-features').classList.remove('display-none');
                    this.$emit('openTab');
                    break;
            } 
        }
    },
};
</script>
