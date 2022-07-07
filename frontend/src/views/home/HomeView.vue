<template>
  <div v-if="state == 'ok'">
    <NavBar/>
    <router-view></router-view>
  </div>
  <div v-else-if="state == 'loading'">loading</div>
  <Login v-else :type="state" @state="state = 'ok'"></Login>
</template>

<script>
import NavBar from '@/views/home/HomeNavbar.vue'
import Login from '@/views/LoginView.vue'

import useLogin from '@/modules/login'
import { onBeforeMount, ref } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    const state = ref('loading')
    const email = ref('')
    const token = ref('') 

    onBeforeMount(() => {
      const { checkToken } = useLogin()
      
      email.value = (email.value == ''|| email.value == null ) ? 'test-email' : email.value
      token.value = (token.value == ''|| token.value == null ) ? 'test-token' : token.value 

      checkToken(email.value, token.value).then((data)=>{ 
        if(data.rsp === 'ok'){
          state.value = 'ok'
        } else {
          state.value = "login"
        }
      }).catch(()=> {
        state.value = 'login'
      })
    })
    
    return {
      state
    }
  },
  components: {
    NavBar, Login
  }
}
</script>
