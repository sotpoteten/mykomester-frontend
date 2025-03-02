import axios from 'axios'
import { useTokenStore } from '@/stores/token.js'
import router from '@/router/index.js'

export async function navigateToPage(page) {
  try {
    const tokenStore = useTokenStore()
    const response = await axios.get(
      `http://localhost:8080/check_token`,
      tokenStore.getAuthorizationConfig(),
    )
    if (response.status == 200) {
      await router.push(page)
    }
  } catch (e) {
    if (e.response == 401) {
      console.error('timeout')
      await router.push('/')
    }
  }
}
