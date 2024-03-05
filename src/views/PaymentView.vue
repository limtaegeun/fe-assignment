<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

const cardNumber = ref(['', '', '', ''])

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
    <v-btn block class="mt-4" color="primary">완료</v-btn>
  </main>
</template>

<style scoped lang="scss"></style>
