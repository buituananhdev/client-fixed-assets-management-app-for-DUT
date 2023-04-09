import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {},
        mutations: {},
        actions: {},
        getters: {
            isAuthenticated(state){
                return state.token != null;
            }
        },
    });
};