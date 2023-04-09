import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

Vue.use(VeeValidate, {
    inject: true,
});

//Custom validator messages i18n
Validator.localize({
    en: {
        messages: {
            required: (field) => `${field} không được để trống.`,
            min: (field, params) =>
                `${field} tối thiểu phải là ${params[0]} ký tự.`,
            max: (field, params) =>
                `${field} tối đa chỉ được ${params[0]} ký tự.`,
            numeric: (field) => `${field} phải là một số nguyên dương.`,
        },
    },
});

// // Custom validator for max condition
// Validator.extend('maxCustom', {
//     getMessage: (field, { length }) =>
//         `${field} tối đa chỉ được ${length} ký tự.`,
//     validate: (value, { length }) => {
//         if (typeof value === 'number') {
//             return value <= length;
//         } else {
//             return value.length <= length;
//         }
//     },
// });
