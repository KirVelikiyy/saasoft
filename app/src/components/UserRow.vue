<template>
  <v-form v-model="isValid" class="row">
    <v-text-field
      v-model="localUser.tags"
      hide-details="auto"
      label="Метка"
      :rules="[rules.max(100)]"
      validate-on="input eager"
      variant="outlined"
      @blur="validateAndEmit"
    />

    <v-select
      v-model="localUser.recordType"
      hide-details="auto"
      :items="[
        { title: 'Локальная', value: 'local' },
        { title: 'LDAP', value: 'LDAP' },
      ]"
      label="Тип записи"
      validate-on="input eager"
      variant="outlined"
      @update:model-value="validateAndEmit"
    />

    <v-text-field
      v-model="localUser.login"
      hide-details="auto"
      label="Логин"
      :rules="[rules.required, rules.max(100)]"
      :style="localUser.recordType !== 'local' ? 'grid-column: 3 / 5' : ''"
      validate-on="input eager"
      variant="outlined"
      @blur="validateAndEmit"
    />

    <v-text-field
      v-if="localUser.recordType === 'local'"
      v-model="localUser.password"
      :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
      hide-details="auto"
      label="Пароль"
      :rules="[rules.required, rules.max(100)]"
      :type="showPassword ? 'text' : 'password'"
      validate-on="eager"
      variant="outlined"
      @blur="validateAndEmit"
      @click:append-inner="showPassword = !showPassword"
    />

    <v-btn
      icon="mdi-delete-outline"
      variant="text"
      @click="emit('remove')"
    />
  </v-form>
</template>

<script setup lang="ts">
  import type { IUser } from '~/types.ts';

  const { user } = defineProps<{
    user: IUser
  }>();

  const emit = defineEmits<{
    (e: 'remove'): void
    (e: 'update:user', v: IUser)
  }>();

  const isValid = ref(false);
  const showPassword = ref(false);

  const localUser = reactive({ ...user });

  localUser.tags = localUser.tags.join('; ');

  const tags = computed(() => {
    return localUser.tags
      .split(';')
      .map(tag => tag.trim())
  })

  watch(() => localUser.recordType, newType => {
    if (newType !== 'local') {
      localUser.password = null;
    }
    validateAndEmit();
  });

  async function validateAndEmit () {
    // ждем пока произойдет валидация подл капотом v-form
    await nextTick();

    if (!isValid.value) {
      return;
    }

    emit('update:user', { ...localUser, tags: tags.value });
  }

  const rules = {
    required: v => !!v || 'Обязательно к заполнению',
    max: (len: number) => (v: string | null) =>
      !v || v.length <= len || `Не более ${len} символов`,
  };
</script>

<style lang="css" scoped>
.row {
  display: contents;
}
</style>
