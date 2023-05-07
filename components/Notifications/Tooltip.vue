<template>
    <div class="tooltip-container div-center">
        <div class="tooltip-content div-center">
            <div
                v-if="type == 'asset'"
                class="button dispose"
                @click="$emit('dispose')"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-bookmark-x-fill dispose-icn"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293 6.854 5.146z"
                    />
                </svg>
                Thanh lý
            </div>
            <div
                v-if="type == 'disposed'"
                class="button update"
                @click="$emit('cancel_dispose')"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-bookmark-plus-fill update-icn"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"
                    />
                </svg>
                Hủy thanh lý
            </div>
            <div class="button delete" @click="$emit('delete')">
                <svg
                    class="delete-icn"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                    />
                </svg>
                Xóa
            </div>
            <div
                v-if="type === 'asset' || type === 'organization'"
                class="button update"
                @click="$emit('update')"
            >
                <svg
                    class="update-icn"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                    />
                </svg>
                Cập nhật
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['type'],
};
</script>

<style scoped>
.tooltip-container {
    display: none;
    position: absolute;
    width: 150px;
    margin: 20px 0;
    padding: 4px 12px;
    box-sizing: border-box;
    background: #fff;
    animation: showTooltip 0.3s ease-in-out;
    animation-fill-mode: forwards;
    background: #fff;
    /* Elevations 2 */
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
}
@keyframes showTooltip {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
svg {
    width: 14px;
}
.tooltip-content {
    widows: 100%;
    height: 100%;
    flex-direction: column;
    gap: 8px;
    padding: 6px;
}
.button {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 8px;
}
.button:first-of-type {
    border-radius: 4px 4px 0 0;
}
.button:last-of-type {
    border-bottom: 0;
    border-radius: 0 0 4px 4px;
}
.button:hover .delete-icn {
    fill: #ee4b2b;
}
.button:hover .update-icn {
    fill: #50c878;
}
.button:hover {
    fill: #ffd700;
}
.delete:hover {
    color: #ee4b2b;
    font-weight: 600;
}
.update:hover {
    color: #50c878;
    font-weight: 600;
}
.dispose:hover {
    color: #ffd700;
    font-weight: 600;
}
</style>
