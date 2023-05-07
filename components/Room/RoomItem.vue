<template>
    <div class="main" :class="{ evenLine: itemIndex % 2 === 0 }">
        <div class="item div-center">
            <p
                class="div-center stt-col"
                @click="$router.push(`/home?page=1&room_id=${itemProp.roomID}`)"
            >
                {{ itemIndex }}
            </p>
            <p
                class="div-center organization-type-col"
                @click="$router.push(`/home?page=1&room_id=${itemProp.roomID}`)"
            >
                {{ itemProp.roomID }}
            </p>
            <p
                class="div-center organization-name-col"
                @click="$router.push(`/home?page=1&room_id=${itemProp.roomID}`)"
            >
                {{ itemProp.roomName }}
            </p>
            <span
                class="div-center show-action-col"
                @mouseover="showAction()"
                @mouseleave="hideAction()"
            >
                <img src="../../static/icons/three-dots-vertical.svg" alt="" />
                <Tooltip
                    class="tooltip"
                    :class="'tooltip' + itemIndex"
                    :type="type"
                    @mouseover="showAction()"
                    @delete="
                        $emit(
                            'showPopup',
                            'xóa',
                            'tổ chức',
                            itemProp.organizationID
                        )
                    "
                    @dispose="
                        $emit(
                            'showPopup',
                            'thanh lý',
                            'tổ chức',
                            itemProp.organizationID
                        )
                    "
                    @update="
                        $emit(
                            'showPopup',
                            'thêm mới',
                            'tổ chức',
                            itemProp.organizationID
                        )
                    "
                    @cancel_dispose="
                        $emit(
                            'showPopup',
                            'hủy thanh lý',
                            'tổ chức',
                            itemProp.organizationID
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
    computed: {
        pageParam() {
            return this.$route.query.page;
        },
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
    cursor: pointer;
}
.item p {
    font-size: 15px;
}
.item:hover p {
    color: #008cde;
    text-decoration: underline;
}
.item:hover .custom-select-trigger {
    color: #008cde;
}
.evenLine {
    background: #dfe0eb;
}
</style>
