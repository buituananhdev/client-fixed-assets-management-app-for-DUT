import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

Vue.use(VeeValidate, {
    inject: true,
});

//Custom validator messages i18n
Validator.localize({
    vi: {
        messages: {
            required: (field) => `Vui lòng nhập ${field}.`,
            min: (field, params) =>
                `${field} tối thiểu phải là ${params.length} ký tự.`,
            max: (field, params) =>
                `${field} tối đa chỉ được ${params.length} ký tự.`,
        },
    },
});
