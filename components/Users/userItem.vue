<template>
    <div class="main" :class="{ evenLine: itemIndex % 2 == 0 }">
        <div class="item div-center">
            <p class="div-center stt-user-col">
                {{ itemIndex }}
            </p>
            <p class="div-center account-col">
                {{ itemProp.username }}
            </p>
            <p class="div-center name-user-col">
                {{ itemProp.fullName }}
            </p>
            <p class="div-center roll-col">
                {{ itemProp.userRole }}
            </p>
            <span
                class="div-center show-action-user-col"
                @mouseover="showAction()"
                @mouseleave="hideAction()"
            >
                <img v-if="itemProp.username !== Username" src="../../static/icons/three-dots-vertical.svg" alt="" />
                <Tooltip
                v-if="itemProp.username !== Username"
                    class="tooltip"
                    :class="'tooltip' + itemIndex"
                    :type="type"
                    @mouseover="showAction()"
                    @delete="
                        $emit('showPopup', 'xóa', 'tài khoản', itemProp.userID)
                    "
                    @update="
                        $emit(
                            'showPopup',
                            'thêm mới',
                            'tài khoản',
                            itemProp.userID
                        )
                    "
                ></Tooltip>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['type', 'itemProp', 'itemIndex'],
    data() {
        return {
            Username: '',
        };
    },
    computed: {
        pageParam() {
            return this.$route.query.page;
        },
    },
    created() {
        this.Username = localStorage.getItem('currentUsername');
    },
    methods: {
        showAction() {
            document
                .querySelector('.tooltip' + this.itemIndex)
                .classList.add('display-block');
        },
        hideAction() {
            document
                .querySelector('.tooltip' + this.itemIndex)
                .classList.remove('display-block');
        },
    },
};
</script>

<style scoped>
.popup {
    height: 120vh;
    top: -80px;
    left: -255px;
    right: 0;
    bottom: 0;
}
.display-block {
    display: block !important;
}
.main {
    width: 100%;
    height: 60px;
    display: flex;
    gap: 20px;
    padding: 0 32px;
}
.item {
    width: 100%;
}
.item p {
    font-size: 15px;
    width: calc(100% / 5);
}
.item:hover .custom-select-trigger {
    color: #008cde;
}
.evenLine {
    background: #dfe0eb;
}
</style>
