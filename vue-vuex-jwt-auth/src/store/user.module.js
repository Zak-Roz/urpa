import UserService from '../services/user.service';

export const user = {

  namespaced: true,
  actions: {
    findUserInDb(_, data) {
      return UserService.findUserInDb(data).then(
        getData => {
          return Promise.resolve(getData);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    allUsers() {
      return UserService.allUsers();
    },
    getById(_, id) {
      return UserService.getById(id).then(
        getData => {
          return Promise.resolve(getData);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    updatePass(_, user) {
      return UserService.updatePass(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    update(_, user) {
      return UserService.update(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  },
};
