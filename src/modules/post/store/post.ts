import { defineStore } from "pinia";
import { axiosInstance } from "../../../plugins/axios";
import { userStore } from "../../auth/store/users";

const store = userStore()

export const postStore = defineStore('post', {
    state: () => ({
        posts: [],
        post: {},
        loading: false,
    }),
    actions: {
        async getPosts() {
            try {
                const { data } = await axiosInstance(`/posts?creator=${store.user?._id}`);
                console.log(data);
            } catch (error) {

            }
        }
    },
    getters: {}
}) 