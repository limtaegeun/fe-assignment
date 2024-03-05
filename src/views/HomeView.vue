<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import TextFieldWithTitle from '@/components/forms/TextFieldWithTitle.vue'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)

const form = ref(null)
const isValid = ref(false)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

onBeforeMount(() => {
  if (account.value) {
    email.value = account.value.email ?? ''
    password.value = account.value.password ?? ''
    confirmPassword.value = account.value.password ?? ''
  }
})
// region action
const router = useRouter()
function next() {
  if (isValid.value) {
    account.value = Object.assign(account.value ?? {}, {
      email: email.value,
      password: password.value
    })
    router.push('/address')
  } else {
    alert('입력값을 확인해주세요.')
  }
}
// endregion
// region rules
// rules :email 형식
const emailRules = [
  (v: string) => !!v || '이메일을 입력해주세요.',
  (v: string) => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.'
]
// rules : 영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열
const regex = ['.*[A-Z].*', '.*[a-z].*', '.*[0-9].*', '.*[!@#$%^&*()_\\-+=~?].*', '.{8,}']
const testPassword = (v: string) => regex.every((reg) => new RegExp(reg).test(v))
const passwordRules = [
  (v: string) => !!v || '비밀번호를 입력해주세요.',
  (v: string) =>
    testPassword(v) ||
    '영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열을 입력해주세요.'
]
const confirmPasswordRules = [
  (v: string) => !!v || '비밀번호를 입력해주세요.',
  (v: string) => v === password.value || '비밀번호가 일치하지 않습니다.'
]
// endregion
</script>

<template>
  <main class="p-4">
    <v-form ref="form" v-model="isValid">
      <text-field-with-title v-model="email" title="이메일" type="email" :rules="emailRules" />
      <text-field-with-title
        v-model="password"
        title="비밀번호"
        :type="showPassword ? 'text' : 'password'"
        :rules="passwordRules"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
      />
      <text-field-with-title
        v-model="confirmPassword"
        title="비밀번호 확인"
        :type="showPassword ? 'text' : 'password'"
        :rules="confirmPasswordRules"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
      />
    </v-form>
    <div class="mt-4">
      <v-btn block color="primary" :disabled="!isValid" @click="next">다음</v-btn>
    </div>
  </main>
</template>
<style scoped lang="scss"></style>
