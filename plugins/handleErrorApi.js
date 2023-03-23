export default (context, inject) => {
    const handleErrorApi = (err, callback) => {
        let _message = '';
        if (!err.response) {
            _message = '';
        } else {
            _message = err.response?.data?.message ?? '';
        }
        if (typeof callback === 'function') {
            callback(_message);
        }
    };

    inject('handleErrorApi', handleErrorApi);
};
