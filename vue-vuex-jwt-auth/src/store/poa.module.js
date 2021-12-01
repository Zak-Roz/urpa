import Poa from '../services/poa.service';

export const poa = {

  namespaced: true,
  actions: {
  // TODO getByName poa
    getByName(_, data) {
      return Poa.getByName(data).then(
        getData => {
          return Promise.resolve(getData);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  // TODO getAll poa
    getAll() {
      return Poa.getAll();
    },
    new(_, data) {
      return Poa.new(data).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },
};
