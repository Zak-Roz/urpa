import axios from 'axios';

const API_URL = 'http://localhost:8080/api/poa/';//api/poa/new

class Poa {
  getByParam(poa) {
    return axios.get(API_URL + `getOne?registration_date=${poa.registration_date}&register_number=${poa.register_number}&blank_number=${poa.blank_number}&blank_series=${poa.blank_series}`);
  }

  getAll() {
    return axios.get(API_URL + 'getOne');
  }
  
  getById(id) {
    return axios.get(API_URL + `getById?pkId=${id}`);
  }

  new(poa) {
    return axios.post(API_URL + 'new', {
      principal_name: poa.principal_name,
      principal_code: poa.principal_code,
      confident_name: poa.confident_name,
      confident_code: poa.confident_code,
      // registration_date: poa.registration_date,
      blank_series: poa.blank_series,
      blank_number: poa.blank_number,
      certification_date: poa.certification_date,
      // register_number: poa.register_number,
      expiry_date: poa.expiry_date,
      registrar_id: JSON.parse(localStorage.getItem('user')).id,
      property: poa.property
    });
  }
  
  getPDF(poa) {
    alert(`http://localhost:8080/api/pdf/addNewPdf`)
    return axios.post(`http://localhost:8080/api/pdf/addNewPdf`, {
      id: poa.id,
      principal_name: poa.principal_name,
      principal_code: poa.principal_code,
      confident_name: poa.confident_name,
      confident_code: poa.confident_code,
      registration_date: poa.registration_date,
      blank_series: poa.blank_series,
      blank_number: poa.blank_number,
      certification_date: poa.certification_date,
      expiry_date: poa.expiry_date,
      property: poa.property
    });
  }

  update(poa) {
    return axios.put(API_URL + 'update', {
      id: poa.id,
      principal_name: poa.principal_name,
      principal_code: poa.principal_code,
      confident_name: poa.confident_name,
      confident_code: poa.confident_code,
      // registration_date: poa.registration_date,
      // blank_series: poa.blank_series,
      // blank_number: poa.blank_number,
      certification_date: poa.certification_date,
      // register_number: poa.register_number,
      is_active: poa.is_active,
      is_duplicate: poa.is_duplicate,
      expiry_date: poa.expiry_date,
      registrar_id: JSON.parse(localStorage.getItem('user')).id,
      property: poa.property
    });
  }
}

export default new Poa();
