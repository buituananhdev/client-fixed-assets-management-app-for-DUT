const fetchAssets = async (currentPage) => {
    try {
        const response = await this.$axios.get( process.env.BASE_URL_API + `/asset?pageNumber=${currentPage}&pageSize=10`);
        return response;
    } catch (error) {
        return error;
    }
};


export default ({ app }, inject) => {
    inject('fetchAssets', fetchAssets);
};