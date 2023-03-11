<template>
    <div class="page-bottom div-center">
        <div class="container">
            <a href="https://dut.udn.vn/">About DUT</a>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.page-bottom {
    width: 100%;
    height: 65px;
    position: absolute;
    z-index: 1;
    bottom: 0;
    background: #fff;
    border-top: solid 1px #dfe0eb;
}
.container{
    width: 960px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.container a {
    font-weight: 600;
    color: #008cde;
    text-decoration: none;
}
</style>
