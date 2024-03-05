<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'

const cardNumber = ref(['', '', '', ''])
const errorMsg = ref('')
const router = useRouter()
const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)
function submit() {
  const msg = validateCardNumber(cardNumber.value)
  if (msg) {
    errorMsg.value = msg
  } else {
    errorMsg.value = ''
    account.value!.cardNumber = cardNumber.value.join('')
    router.push('/complete')
  }
}
function validateCardNumber(cardNumber: string[]) {
  const cardNumberStr = cardNumber.join('')
  if (cardNumberStr.length < 16) {
    return '카드번호를 입력해주세요.'
  } else if (cardNumberStr.length >= 16) {
    const result = cardNumberStr.split('').reduceRight((acc, cur, idx) => {
      if (idx % 2 !== 0) {
        const num = Number(cur) * 2
        if (num > 9) {
          return acc + (Math.floor(num / 10) + (num % 10))
        } else {
          return acc + num
        }
      } else {
        return acc + Number(cur)
      }
    }, 0)
    console.log(result)
    if (result % 10 === 0) {
      return ''
    } else {
      return '카드번호가 올바르지 않습니다.'
    }
  }
  return ''
}

function input(e: InputEvent) {
  // console.log(e)
  const target = e.target as HTMLInputElement
  const index = Number(target.getAttribute('index'))

  if (target.value.length > 4) {
    // 4글자까지 입력 가능하도록
    target.value = target.value.slice(0, 4)
    nextTick(() => {
      cardNumber.value[index] = target.value
    })
  } else if (e.inputType === 'insertText' && !/^\d+$/.test(target.value)) {
    // 숫자만 입력 가능하도록
    target.value = target.value.replace(/\D/g, '')
    nextTick(() => {
      cardNumber.value[index] = target.value
    })
  }

  // 4글자 입력 시 다음 input으로 포커스 이동
  if (target.value.length === 4) {
    const list = document.getElementsByClassName(
      'v-field__input'
    ) as HTMLCollectionOf<HTMLInputElement>

    if (index < 3) {
      list[index + 1].focus()
    }
  }
}
</script>

<template>
  <main>
    <h2 class="form-label">카드번호</h2>
    <div class="card-number-form flex gap-2">
      <v-text-field
        v-model="cardNumber[0]"
        variant="outlined"
        @input="input"
        inputmode="numeric"
        index="0"
      />
      <v-text-field
        v-model="cardNumber[1]"
        variant="outlined"
        @input="input"
        inputmode="numeric"
        index="1"
      />
      <v-text-field
        v-model="cardNumber[2]"
        variant="outlined"
        @input="input"
        inputmode="numeric"
        index="2"
      />
      <v-text-field
        v-model="cardNumber[3]"
        variant="outlined"
        @input="input"
        inputmode="numeric"
        index="3"
      />
    </div>
    <p v-show="errorMsg" class="text-red-600">{{ errorMsg }}</p>
    <v-btn block class="mt-4" color="primary" @click="submit">완료</v-btn>
  </main>
</template>

<style scoped lang="scss"></style>
