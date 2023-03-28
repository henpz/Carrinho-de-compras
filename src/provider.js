import axios from "axios";


export const api = axios.create({
    baseURL: 'https://crudcrud.com/api/f823f1f83dd947808b4788f961bc553b/',
    timeout: 10000,
  });