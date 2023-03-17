<template>
    <div class="main" :class="{ evenLine: itemIndex % 2 == 0 }">
        <div class="item div-center">
            <p
                class="div-center stt-col"
                @click="$router.push(`/details_asset?id=${itemProp.assetID}`)"
            >
                {{ itemIndex }}
            </p>
            <p
                class="div-center id-col"
                @click="$router.push(`/details_asset?id=${itemProp.assetID}`)"
            >
                {{ itemProp.assetID }}
            </p>
            <p
                class="div-center device-id-col"
                @click="$router.push(`/details_asset?id=${itemProp.assetID}`)"
            >
                {{ itemProp.deviceID }}
            </p>
            <p
                class="div-center name-col"
                @click="$router.push(`/details_asset?id=${itemProp.assetID}`)"
            >
                {{ itemProp.assetName }}
            </p>
            <p
                class="div-center year-used-col"
                @click="$router.push(`/details_asset?id=${itemProp.assetID}`)"
            >
                {{ itemProp.yearOfUse }}
            </p>
            <p
                class="div-center quantity-col"
                @click="$router.push(`/details_asset?id=${itemProp.assetID}`)"
            >
                {{ itemProp.quantity }}
            </p>
            <p
                class="div-center cost-col"
                @click="$router.push(`/details_asset?id=${itemProp.assetID}`)"
            >
                {{ itemProp.cost }}
            </p>
            <div class="div-center status-col" @click.stop="toggleSelect">
                <div class="custom-select-wrapper div-center">
                    <select
                        name="sources"
                        id="sources"
                        class="custom-select sources"
                        v-model="selectedOption"
                    ></select>
                    <div
                        class="custom-select"
                        @click.stop="toggleSelect"
                        :class="{ opened: isOpen }"
                    >
                        <span class="custom-select-trigger">{{
                            selectedOption ? selectedOption : itemProp.status
                        }}</span>
                        <div class="custom-options">
                            <span
                                v-for="(option, index) in options"
                                :key="index"
                                :class="[
                                    'custom-option',
                                    { selection: option === selectedOption },
                                ]"
                                @click="selectOption(option)"
                                @mouseover="setHover(index)"
                            >
                                {{ option }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <span
                class="div-center show-action-col"
                @mouseover="showAction()"
                @mouseleave="hideAction()"
            >
                <img src="../../static/icons/three-dots-vertical.svg" alt="" />
                <Tooltip
                    class="tooltip"
                    :class="'tooltip' + itemIndex"
                    @mouseover="showAction()"
                    @delete="openPopup()"
                ></Tooltip>
            </span>
        </div>
        <PopUp
            class="popup"
            v-show="isShowPopup"
            @closePopup="closePopup()"
            @submitForm="submitForm"
            :title="'Delete ?'"
            :content="'Bạn có chắc muốn xóa tài sản này'"
        ></PopUp>
    </div>
</template>

<script>
export default {
    props: ['itemProp', 'itemIndex'],
    data() {
        return {
            isOpen: false,
            isShowPopup: false,
            selectedOption: null,
            hoverIndex: -1,
            options: ['Hư hỏng, cần sửa chữa', 'Hoạt động tốt'],
        };
    },
    computed: {
        pageParam() {
            return this.$route.query.page;
        },
    },
    methods: {
        async deleteAsset() {
            try {
                await this.$axios.delete(`/asset/${this.itemProp.assetID}`);
            } catch (error) {
                console.log(error);
            }
        },
        submitForm() {
            this.deleteAsset();
            this.$emit('refreshData');
        },
        openPopup() {
            this.isShowPopup = true;
        },
        closePopup() {
            this.isShowPopup = false;
            console.log(this.isShowPopup);
        },
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
        toggleSelect() {
            this.isOpen = !this.isOpen;
            console.log(this.isOpen);
        },
        selectOption(option) {
            this.selectedOption = option;
        },
        setHover(index) {
            this.hoverIndex = index;
        },
    },
    mounted() {
        const select = document.querySelector('.custom-select-wrapper select');
        const template = `
    <div class="${select.className}">
        <div class="custom-options">
            ${[...select.options]
                .map(
                    (option) => `
            <span class="custom-option ${option.className}" data-value="${option.value}">${option.innerHTML}</span>
            `
                )
                .join('')}
        </div>
    </div>
    `;
        select.insertAdjacentHTML('afterend', template);
        select.parentNode.removeChild(select);

        const customSelectTrigger = document.querySelector(
            '.custom-select-trigger'
        );
        customSelectTrigger.addEventListener('click', () => {
            document.querySelectorAll('.custom-select').forEach((select) => {
                if (
                    select.classList.contains('opened') &&
                    select !== customSelectTrigger.parentNode
                ) {
                    select.classList.remove('opened');
                }
            });
            customSelectTrigger.parentNode.classList.toggle('opened');
        });

        document.addEventListener('click', () => {
            document.querySelectorAll('.custom-select').forEach((select) => {
                select.classList.remove('opened');
            });
        });
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
/** Custom Select **/
.custom-select-wrapper {
    position: relative;
    gap: 10px;
    user-select: none;
    cursor: pointer;
    width: 100%;
}
.custom-select-wrapper select {
    display: none;
}
.custom-select {
    position: relative;
    display: inline-block;
}
.custom-select-trigger:after {
    position: absolute;
    display: block;
    content: '';
    width: 8px;
    height: 8px;
    top: 53%;
    right: -20px;
    margin-top: -3px;
    border-bottom: 1px solid #008cde;
    border-right: 1px solid #008cde;
    transform: rotate(45deg) translateY(-50%);
    transition: all 0.2s ease-in-out;
    transform-origin: 50% 0;
    cursor: pointer;
}
.custom-select.opened .custom-select-trigger:after {
    margin-top: 3px;
    transform: rotate(-135deg) translateY(-50%);
}
.custom-options {
    position: absolute;
    z-index: 2;
    display: block;
    top: 100%;
    left: 0;
    right: 0;
    min-width: 100%;
    width: 200px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #fff;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-15px);
    background: #ffffff;
    /* Elevations 2 */
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
}
.custom-select.opened .custom-options {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
    transform: translateY(0);
}

.option-hover:before {
    background: #f9f9f9;
}
.custom-option {
    height: 44px;
    padding-left: 22px;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    /* Body/Light-16 */
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 24px */

    /* text/light/secondary */

    color: #3e3f66;
}
.custom-option:first-of-type {
    border-radius: 4px 4px 0 0;
}
.custom-option:last-of-type {
    border-bottom: 0;
    border-radius: 0 0 4px 4px;
}
.custom-option:hover,
.custom-option.selection {
    color: #008cde;
    background: #dfe0eb;
}
.show-action-col::after {
    display: none;
    content: '';
    width: 100px;
    height: 100px;
}
</style>
