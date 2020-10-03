import { router } from '../../main';

const state = {
    token:
        window.localStorage.getItem('token')
    , user: null
};
const getters = {
    isLoggedIn: state => !!state.token,
    user: state => state.user
};
const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setUser: (state, user) => {
        state.user = user;
    }
};
const actions = {
    login: ({ commit }, { token, user }) => {
        window.localStorage.setItem('token', token);
        commit('setToken', token);
        commit('setUser', user);
        router.replace('/')
    },
    logout: ({ commit }) => {
        window.localStorage.removeItem('token');
        commit('setToken', null);
        commit('setUser', null);
        router.replace('/login')
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}