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

import { ref } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    const state = ref('ok')
    
    return {
      state
    }
  },
  components: {
    NavBar, Login
  }
}
</script>
