<script setup lang="ts">
import { nextTick, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

declare global {
  interface Window {
    daum: any
  }
}
defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  'update:modelValue': [string]
}>()

const addr1 = ref('')
const addr2 = ref('')

onBeforeMount(() => {
  initPostCode()
})

const isShowSearchEl = ref(false) // 찾기 화면 보이기 여부
const searchEl = ref<HTMLElement | null>(null) // 찾기 화면 Element
function initPostCode() {
  let postScript = document.createElement('script')
  postScript.setAttribute('src', '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
  document.head.appendChild(postScript)

  postScript.onload = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') {
          // 사용자가 도로명 주소를 선택했을 경우
          addr1.value = data.roadAddress
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr1.value = data.jibunAddress
        }
        updateAddr()
        isShowSearchEl.value = false
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
      width: '100%',
      height: '100%'
    }).embed(searchEl.value, {
      autoClose: false
    })
  }
}
async function showSearchView() {
  isShowSearchEl.value = true
  await nextTick()
  searchEl.value?.scrollIntoView({ behavior: 'smooth', block: 'end' })
}
function updateAddr() {
  emit('update:modelValue', (addr1.value + ' ' + addr2.value).trim())
}

// rules
const emptyRule = [(v: string) => !!v || '주소를 입력해주세요.']
</script>

<template>
  <div class="postcode-form">
    <div class="text-filed-box flex">
      <div class="flex-1 flex items-center mb-[22px]">
        <h2 class="form-label">주소</h2>
      </div>
      <div class="flex-1">
        <v-btn color="primary" @click="showSearchView">우편번호</v-btn>
      </div>
    </div>
    <v-text-field
      v-model="addr1"
      readonly
      variant="outlined"
      :rules="emptyRule"
      @click="showSearchView"
    />
    <v-text-field v-model="addr2" variant="outlined" @update:model-value="updateAddr()" />
    <div ref="searchEl" class="h-[500px]" v-show="isShowSearchEl"></div>
  </div>
</template>

<style scoped lang="scss"></style>
