<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)
const email = computed(() => {
  return `이메일: <a href="mailto:${account.value?.email}">${account.value?.email}</a>`
})
</script>

<template>
  <main class="fit-screen flex flex-col justify-center items-center">
    <h2 class="whitespace-pre-line">{{ `"${account?.name}"님,\n회원가입이\n완료되었습니다.` }}</h2>
    <p v-html="email"></p>
    <p>주소: {{ account?.addr1 + ' ' + account?.addr2 }}</p>
    <p>연락처: {{ account?.phone }}</p>
  </main>
</template>

<style scoped lang="scss">
.fit-screen {
  height: calc(100vh - 64px);
}
h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
}
p {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
</style>
