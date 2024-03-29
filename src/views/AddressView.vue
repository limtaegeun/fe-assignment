<script setup lang="ts">
import TextFieldWithTitle from '@/components/forms/TextFieldWithTitle.vue'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'
import DaumAddress from '@/components/forms/DaumAddress.vue'
import { useRouter } from 'vue-router'

const form = ref<{ validate: () => void } | null>(null)
const isValid = ref(false)
const name = ref('')
const phone = ref('')
const addr1 = ref('')
const addr2 = ref('')
const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)
onBeforeMount(() => {
  if (account.value) {
    name.value = account.value.name ?? ''
    phone.value = account.value.phone ?? ''
    addr1.value = account.value.addr1 ?? ''
    addr2.value = account.value.addr2 ?? ''
  }
})
// region action
const router = useRouter()
function next() {
  form.value?.validate()
  if (isValid.value) {
    account.value = Object.assign(account.value ?? {}, {
      name: name.value,
      phone: phone.value,
      addr1: addr1.value,
      addr2: addr2.value
    })
    router.push('/payment')
  } else {
    alert('입력값을 확인해주세요.')
  }
}
function updateAddress(address: { addr1: string; addr2: string }) {
  addr1.value = address.addr1
  addr2.value = address.addr2
}
// endregion

// region rules
//rules: 이름
const nameRules = [
  (v: string) => !!v || '이름을 입력해주세요.',
  (v: string) =>
    /^[가-힣]{2,}$|^[a-zA-Z]{3,}$/.test(v) ||
    '2글자 이상의 한글 완성형, 또는 3글자 이상의 영문 알파벳을 입력해주세요.'
]
// rule: 전화번호 0으로 시작하며 중간 3-4자리, 마지막 4자리의 형식, 하이픈 또는 공백 허용
const phoneRules = [
  (v: string) => !!v || '전화번호를 입력해주세요.',
  (v: string) =>
    /^0\d{1,2}-\d{3,4}-\d{4}$|^0\d{1,2}\s\d{3,4}\s\d{4}$|^\d{10,11}$/.test(v) ||
    '전화번호 형식이 올바르지 않습니다.'
]
// endregion
</script>

<template>
  <main>
    <v-form ref="form" v-model="isValid">
      <text-field-with-title title="이름" v-model="name" :rules="nameRules" />
      <text-field-with-title title="연락처" v-model="phone" :rules="phoneRules" />
      <daum-address :init-value="{ addr1: addr1, addr2: addr2 }" @update="updateAddress" />
      <div class="actions flex gap-2">
        <v-btn color="grey-lighten-3" class="flex-1" @click="router.back()">이전</v-btn>
        <v-btn color="primary" class="flex-1" :disabled="!isValid" @click="next">다음</v-btn>
      </div>
    </v-form>
  </main>
</template>

<style scoped lang="scss"></style>
