import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as companionApi from '@/api/companionApi'

export const useCompanionStore = defineStore('companion', () => {
    const posts = ref([])
    const total = ref(0)
    const page = ref(1)
    const pageSize = ref(6)
    const filters = ref({
        country: '',
        startDate: '',
        endDate: '',
        title: ''
    })
    const loading = ref(false)
    const error = ref('')

    const fetch = async (newPage = 1) => {
        loading.value = true
        error.value = ''
        try {
            const { data } = await companionApi.list({
                ...filters.value,
                page: newPage,
                size: pageSize.value
            })
            posts.value = data.content
            total.value = data.currentElements
            page.value = data.page
        } catch (e) {
            error.value = e.message || '데이터를 불러오지 못했ㅅ브니다.'
        } finally {
            loading.value = false
        }
    }

    const setFilter = (key, value) => {
        filters.value[key] = value
    }

    return {
        posts, total, page, pageSize,
        filters, loading, error,
        fetch, setFilter
    }
})