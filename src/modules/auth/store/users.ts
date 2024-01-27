import { defineStore } from 'pinia'
import { axiosInstance } from '../../../plugins/axios'
import { LoginPayload, LoginResponse, LoginStore, SignupPayload } from './../interfaces/login.interface';

import { uiStore } from '../../../store/ui';

const ui = uiStore();

export const userStore = defineStore('user', {
    state: (): LoginStore => ({
        user: null,
        token: null,
        loading: false,
        error: null,
    }),
    getters: {},
    actions: {
        async login(payload: LoginPayload) {
            this.loading = true;
            try {
                const { data } = await axiosInstance.post<LoginResponse>('/users/login', payload)

                this.setUser(data)
                ui.activeSnack(`Bienvenido ${data.user?.firstname}`)
            } catch (error: any) {
                const text = error.response.data.errors[0]
                ui.activeSnack(text, false)
                throw new Error("");
            } finally {
                this.loading = false;
            }
        },
        async signup(payload: SignupPayload) {
            this.loading = true;
            try {
                const { data } = await axiosInstance.post('/users/signup', payload)
                ui.activeSnack(data.message)
            } catch (error: any) {
                const text = error.response.data.errors[0]
                ui.activeSnack(text, false)
            } finally {
                this.loading = false;
            }
        },
        async getUserBytoken(token: string) {
            try {
                const { data } = await axiosInstance.post('/users/token', { token })
                
                this.setUser({
                    user: data,
                    token
                })
            } catch (error: any) {
                const text = error.response.data.errors[0]
                ui.activeSnack(text, false)
            } finally {
            }
        },
        setUser(data: LoginResponse) {
            this.user = data.user;
            this.token = data.token;
            localStorage.setItem('token', JSON.stringify(data.token));
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token');
        }
    },
})