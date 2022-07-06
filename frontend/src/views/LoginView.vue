<template>
    <div class="d-flex text-center mt-md-5">
    
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'

import useLogin from '../modules/login'

export default { 
    props: {
        email: {
            type: String,
            default() {
                return '' 
            }
        },
        type: {
            type: String,
            default() {
                return 'login'
            }
        }
    },
    emits: ['state'],
    created() {

    },  
    setup(props) {
        const ref_email = ref(null)
        const stay = ref(false)
        const is_login_form = ref(props.type == 'login')

        const pEmail = ref(props.email)
        const password = ref('')
        const new_password1 = ref('')
        const new_password2 = ref('')

        const invalid = ref('ok')
        const {login, updatePassword } = useLogin()

        const msg = type => {
            return {
                wrong_password: '비밀번호가 틀렸습니다.',
                diff_passwords: '새로운 비밀번호가 다릅니다.'
            }[type]
        }

        // TODO session 
        // stay.vaoue = getSession('stay') == 'true' 

        onMounted( () => {
            ref_email.value.focus()
        })

        return {
            ref_email, pEmail, password, new_password1, new_password2, is_login_form, invalid, msg, login, updatePassword, stay
        }
    }
}
</script>

<style>

</style>