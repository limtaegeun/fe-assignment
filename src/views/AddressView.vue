<script setup lang="ts">
import TextFieldWithTitle from '@/components/forms/TextFieldWithTitle.vue'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'
import DaumAddress from '@/components/forms/DaumAddress.vue'

const isValid = ref(false)
const name = ref('')
const phone = ref('')

const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)
onBeforeMount(() => {
  if (account.value) {
    name.value = account.value.email ?? ''
    phone.value = account.value.password ?? ''
  }
})
</script>

<template>
  <main>
    <v-form v-model="isValid">
      <text-field-with-title title="이름" v-model="name" />
      <text-field-with-title title="연락처" v-model="phone" />
      <daum-address />
    </v-form>
  </main>
</template>

<style scoped lang="scss"></style>
