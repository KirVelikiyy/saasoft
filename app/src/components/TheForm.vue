<template>
  <div class="title">
    <v-card-title>Учетные записи</v-card-title>
    <v-btn variant="outlined" @click="onAddUser">
      <v-icon icon="mdi-plus" />
    </v-btn>
  </div>

  <v-alert
    icon="mdi-help-circle-outline"
    text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
  />

  <div class="form-container">
    <div class="labels">
      <span>Метки</span>
      <span>Тип записи</span>
      <span>Логин</span>
      <span style="grid-column: 4 / 6">Пароль</span>
    </div>

    <UserRow
      v-for="user of users"
      :key="user.id"
      :user="user"
      @remove="removeUser(user.id)"
      @update:user="updateUser"
    />
  </div>
</template>

<script setup lang="ts">
  import { useUsersStore } from '@/stores/users.ts';

  const { getUsers, removeUser, addUser, updateUser } = useUsersStore();

  const users = getUsers();

  function onAddUser () {
    addUser({
      id: 0,
      tags: ['Значение'],
      recordType: 'local',
      login: 'Значение',
      password: 'Пароль',
    })
  }
</script>

<style lang="css" scoped>
.title {
   display: flex;
   flex-direction: row;
   align-items: center;
   gap: 1rem;
}
.form-container {
   display: grid;
   grid-template-columns: repeat(4, 1fr) auto;
   column-gap: 1rem;
   row-gap: .5rem;
}
.labels {
   display: contents;
   font-weight: 200;
}
</style>
