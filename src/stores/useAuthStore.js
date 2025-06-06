// stores/useAuthStore.js
import { defineStore } from 'pinia'
import axios from 'axios'
import api from '@/api/_instance'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      id: '',
      loginId: '',
      name: '',
      nickname: '',
      email: '',
      profileImage: '',
      socialType: '',
    },
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user?.loginId,
    userNickname: (state) => state.user.nickname,
    userEmail: (state) => state.user.email,
    userProfileImage: (state) => state.user.profileImage,
    userSocialType: (state) => state.user.socialType,
    userName: (state) => state.user.name,
  },

  actions: {
    async fetchUser() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/members/me')
        this.user = res.data
      } catch (err) {
        this.error = err
        this.user = {
          id: '',
          loginId: '',
          name: '',
          nickname: '',
          email: '',
          profileImage: '',
          socialType: '',
        }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await axios.post('/api/auth/logout')
        this.user = {
          id: '',
          loginId: '',
          name: '',
          nickname: '',
          email: '',
          profileImage: '',
          socialType: '',
        }
      } catch (err) {
        console.error('로그아웃 중 오류 발생:', err)
      }
    },
  },
})

//로그아웃시
// const auth = useAuthStore()
// auth.logout()
