import UserService from '../services/user.service';

export const user = {

  namespaced: true,
  actions: {
    findUserInDb(_, data) {
      // return data;
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
      return UserService.getById(id);
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
  },
};
