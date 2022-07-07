<template>
    <div class="d-flex text-center mt-md-5">
        <main class="form-signin">
            <form @submit="onSubmit">
                <h1 class="h3 mb-3 fw-normal">
                    {{ is_login_form ? '로그인 하세요' : '비밀번호 업데이트' }}
                </h1>
                <small class="text-danger" v-if="invalid == 'no_email'">
                    이메일이 존재하지 않습니다.
                </small>
                <input
                    type="email"
                    id="inputEmail"
                    class="form-control mb-1"
                    placeholder="Email address"
                    autocomplete="username" 
                    required
                    ref="ref_email"
                    v-model="pEmail"
                />
                <small class="text-danger" v-if="invalid == 'wrong_password'">
                    비밀번호가 틀렸습니다.
                </small>
                <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    autocomplete="current-password"
                    required
                    v-model="password"
                />
                <div v-if="!is_login_form">
                    <small class="text-danger" v-if="invalid == 'diff_passwords'">
                        새로운 비밀번호가 다릅니다.
                    </small>
                    <input
                        type="password"
                        id="inputPasswordNew1"
                        class="form-control"
                        :class="{ 'is-invalid': invalid == 'diff_passwords' }"
                        placeholder="New Password"
                        autocomplete="new-password"
                        required
                        v-model="new_password1"
                    />
                    <input
                        type="password"
                        id="inputPasswordNew2"
                        class="form-control"
                        :class="{ 'is-invalid': invalid == 'diff_passwords' }"
                        placeholder="New Password"
                        autocomplete="new-password"
                        required
                        v-model="new_password2"
                    />
                </div>
                <div class="m-3"></div>
                <div class="checkbox mb-3" v-if="is_login_form">
                    <input type="checkbox" v-model="stay" /> 로그인 유지하기
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                    {{ !is_login_form ? '변경하기' : '입장하기' }}
                </button>
            </form>
        </main>
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

        const onSubmit = (evt) => {
            if (evt) {
                evt.preventDefault()
            }
            invalid.value = 'ok'
            if (is_login_form.value) {
                login(pEmail.value, password.value)
            }

        }

        return {
            ref_email,
            pEmail,
            password,
            new_password1,
            new_password2,
            onSubmit,
            is_login_form,
            invalid,
            stay

        
            ,updatePassword
            ,msg
        }
    }
}
</script>

<style>

</style>