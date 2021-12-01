import WorkService from '../services/work.service';

export const work = {

  namespaced: true,
  actions: {
    getByName(_, work) {
      return WorkService.getByName(work).then(
        work => {
          return Promise.resolve(work);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getAll() {
      return WorkService.getAll();
    },
    new(_, work) {
      return WorkService.new(work).then(
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
