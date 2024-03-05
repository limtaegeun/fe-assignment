<script setup lang="ts">
import TextFieldWithTitle from '@/components/forms/TextFieldWithTitle.vue'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'
import DaumAddress from '@/components/forms/DaumAddress.vue'
import { useRouter } from 'vue-router'

const isValid = ref(false)
const name = ref('')
const phone = ref('')
const address = ref('')
const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)
onBeforeMount(() => {
  if (account.value) {
    name.value = account.value.email ?? ''
    phone.value = account.value.password ?? ''
  }
})
const router = useRouter()
function next() {
  if (isValid) {
    account.value = { name: name.value, phone: phone.value, address: address.value }
    router.push('/payment')
  } else {
    alert('입력값을 확인해주세요.')
  }
}
</script>

<template>
  <main>
    <v-form v-model="isValid">
      <text-field-with-title title="이름" v-model="name" />
      <text-field-with-title title="연락처" v-model="phone" />
      <daum-address v-model="address" />
      <div class="actions flex gap-2">
        <v-btn color="grey-lighten-3" class="flex-1" @click="">이전</v-btn>
        <v-btn color="primary" class="flex-1" @click="next">다음</v-btn>
      </div>
    </v-form>
  </main>
</template>

<style scoped lang="scss"></style>
