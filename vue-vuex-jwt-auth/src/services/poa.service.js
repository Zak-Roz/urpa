import axios from 'axios';

const API_URL = 'http://localhost:8080/api/poa/';//api/poa/new

class Poa {
  // TODO getByName poa
  getByName(poa) {
    return axios
      .get(API_URL + 'getByName', {
        organization_name: poa.organization_name,
      })
      .then(response => {
        return response;
      });
  }

  // TODO getAll poa
  getAll() {
    return axios.get(API_URL + 'getAll', {});
  }

  new(poa) {
    return axios.post(API_URL + 'new', {
      principal_name: poa.principal_name,
      principal_code: poa.principal_code,
      confident_name: poa.confident_name,
      confident_code: poa.confident_code,
      registration_date: poa.registration_date,
      blank_series: poa.blank_series,
      blank_number: poa.blank_number,
      certification_date: poa.certification_date,
      register_number: poa.register_number,
      expiry_date: poa.expiry_date,
      registrar_id: JSON.parse(localStorage.getItem('user')).id,
      property: poa.property
    });
  }
}

export default new Poa();
