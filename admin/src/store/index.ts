import { createStore } from "vuex";

import axiosClient from "@/lib/axios";
import { tokenKey } from "@/lib/token";

import { User } from "@/types/user";

interface StoreState {
    user: {
        data: User | null;
        token: string | null;
    };
}

const store = createStore<StoreState>({
    state: {
        user: {
            data: null,
            token: sessionStorage.getItem(tokenKey),
        },
    },
    getters: {},
    actions: {
        login: ({ commit }, creds) => {
            return axiosClient.post("/login", creds).then(({ data }) => {
                commit("setToken", data.token);
                commit("setUser", data.user);
                return data;
            });
        },
        logout: ({ commit }) => {
            return axiosClient.get("/logout").then(() => {
                commit("setToken", null);
            });
        },
        getUser: ({ commit }) => {
            return axiosClient.get("/user").then(({ data }) => {
                commit("setUser", data.user);
            });
        },
    },
    mutations: {
        setToken: (state, token) => {
            state.user.token = token;
            if (token) {
                sessionStorage.setItem(tokenKey, token);
            } else {
                sessionStorage.removeItem(tokenKey);
            }
        },
        setUser: (state, user) => {
            state.user.data = user;
        },
    },
});

export default store;
