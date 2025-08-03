import { defineStore } from 'pinia'
import type {IUser} from '@/types'

export const useUsersStore = defineStore('users', () => {
  let ID = 1;
  function updateMaxId (users: IUser[]) {
    for (const user of users) {
      if (user.id >= ID) {
        ID = user.id + 1;
      }
    }
  }

  function getFromLocalStore () {
    const users = localStorage.getItem('users');

    return users ? JSON.parse(users) : [];
  }

  function updateLocalStore () {
    localStorage.setItem('users', JSON.stringify(_users.value));
  }

  const loadedData = getFromLocalStore();
  const _users = ref<IUser[]>(loadedData);
  updateMaxId(loadedData);

  function getUsers () {
    return _users;
  }

  function addUser (user: IUser) {
    _users.value.push({ ...user, id: ID++ });
    updateLocalStore()
  }

  function removeUser (id: number) {
    const index = _users.value.findIndex(user => user.id === id);
    _users.value.splice(index, 1);
    updateLocalStore()
  }

  function updateUser (user: IUser) {
    const index = _users.value.findIndex(u => u.id === user.id);
    _users.value[index] = user;
    updateLocalStore()
  }

  return {
    getUsers,
    addUser,
    removeUser,
    updateUser,
  }
})
