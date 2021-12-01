import axios from 'axios';

const API_URL = 'http://localhost:8080/api/workplace/';//api/workplace/new

class WorkService {
  getByName(workplace) {
    return axios
      .get(API_URL + 'getByName', {
        organization_name: workplace.organization_name,
      })
      .then(response => {
        return response;
      });
  }

  getAll() {
    return axios.get(API_URL + 'getAll', {});
  }

  new(workplace) {
    return axios.post(API_URL + 'new', {
      email: workplace.email,
      organization_name: workplace.organization_name,
    });
  }
}

export default new WorkService();
