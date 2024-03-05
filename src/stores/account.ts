import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreateAccountDto } from '@/models/account'

export const useAccountStore = defineStore('counter', () => {
  const account = ref<CreateAccountDto | null>(null)

  return { account }
})
