<script setup>
import { onMounted } from 'vue'
import { callbacknaver } from '@/api/authApi'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  const code = new URLSearchParams(window.location.search).get('code')

  if (!code) {
    console.error('인가 코드 없음')
    router.push('/login')
    return
  }

  try {
    const res = await callbacknaver(code)
    console.log('네이버버 로그인 성공:', res.data)

    router.push('/')
  } catch (err) {
    console.error('네이버버 로그인 실패:', err)
  }
})
</script>
