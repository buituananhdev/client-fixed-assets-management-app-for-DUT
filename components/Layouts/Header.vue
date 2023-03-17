<template>
    <div class="page-top">
        <div class="page-top-content">
            
            <div class="user-box">
                <p>ADMIN</p>
                <img class="user-avt" src="../../static/images/user.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.page-top {
    display: flex;
    width: calc(100% - 255px);
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
}
.page-top-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 1440px;
    height: 60px;
    
}
.user-box {
    display: flex;
    gap: 14px;
    align-items: center;
    padding-left: 32px;
    border-left: solid 2px #dfe0eb;
}
.user-avt {
    width: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: #dfe0eb51 0px 6px 24px 0px, #dfe0eb67 0px 0px 0px 3px;
}
</style>
