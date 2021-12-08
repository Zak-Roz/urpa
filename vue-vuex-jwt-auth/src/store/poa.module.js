import Poa from '../services/poa.service';

export const poa = {

  namespaced: true,
  actions: {
  // TODO getByParam poa
    getByParam(_, data) {
      return Poa.getByParam(data).then(
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
    getById(_, id) {
      return Poa.getById(id);
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
