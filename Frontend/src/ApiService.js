// Create a service for API requests
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const ApiService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBike: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bikes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  selectBike: async (userId, bikeId,str) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/select-bike`, { userId, bikeId ,str});
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductionRecords: async (emp,date) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bike-data?userId=${emp}&date=${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllProductionRecords: async (date) => {
    try {
      const {from, to } = date;
      const response = await axios.get(`${API_BASE_URL}/all_bike_data?fromDate=${from}&toDate=${to}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getEmployees: async()=>{
    try{
     const response = await axios.get(`${API_BASE_URL}/get_employees`);
     return response.data;
    }catch (error) {
      throw error;
    }
  },
  getUsername: async(id)=>{
    try{
     const response = await axios.get(`${API_BASE_URL}/get_employees/${id}`);
     return response.data;
    }catch (error) {
      throw error;
    }
  },
  updateStat: async (_id, status, assemblyTime, userId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/update_bike`, { _id, status, assemblyTime, userId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getBikesById: async (userId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/get_bike_stg`, {userId})
      return response.data
    } catch (error) {
      throw error
    }
  }
};

export default ApiService;
