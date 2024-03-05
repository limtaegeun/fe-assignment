<script setup lang="ts">
defineProps<{
  title: string
  modelValue: string
  type?: string
  rules?: any[]
  appendInnerIcon?: string
}>()
defineEmits<{
  'update:modelValue': [string]
  'click:append-inner': [any]
}>()
</script>

<template>
  <div class="text-filed-box flex">
    <div class="flex-1 flex items-center mb-[22px]">
      <h2 class="form-label">{{ title }}</h2>
    </div>
    <div class="flex-1">
      <v-text-field
        :model-value="modelValue"
        variant="outlined"
        :type="type"
        :rules="rules"
        :append-inner-icon="appendInnerIcon"
        @update:model-value="$emit('update:modelValue', $event)"
        @click:append-inner="$emit('click:append-inner', $event)"
      ></v-text-field>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
