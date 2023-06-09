import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

Vue.use(VeeValidate, {
    inject: true,
});

Validator.extend('password', {
    validate: (value) => {
        const strongRegex = /^(?=.*[a-zA-Z]).{8,32}$/;
        return strongRegex.test(value);
    },
});

Validator.localize({
    en: {
        messages: {
            password:
                'Mật khẩu phải phải nằm trong khoảng 8 - 32 ký tự và chứa ít nhất 1 chữ cái',
            password_match: 'Xác nhận mật khẩu không khớp',
            required: (field) => `${field} không được để trống.`,
            min: (field, params) =>
                `${field} tối thiểu phải là ${params[0]} ký tự.`,
            max: (field, params) =>
                `${field} tối đa chỉ được ${params[0]} ký tự.`,
            numeric: (field) => `${field} phải là một số nguyên dương.`,
        },
    },
});