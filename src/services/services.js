import axios from "axios";

export const getTasks = async (number) =>
  await axios({
    url: `http://localhost:3002/tasks`,
    method: "get",
  });

export const addTask = async (data) =>
  await axios({
    url: `http://localhost:3002/task`,
    method: "post",
    data: data,
  });

export const updateTask = async (data) =>
  await axios({
    url: `http://localhost:3002/task/${data?.id}`,
    method: "put",
    data: data,
  });

export const deleteTask = async (id) =>
  await axios({
    url: `http://localhost:3002/task/${id}`,
    method: "delete",
  });

export const checkUser = async (data) =>
  await axios({
    url: `http://localhost:3002/check-account`,
    method: "post",
    data: data,
  });

// Add a custom config for request interceptor if there are some
axios.interceptors.request.use(
  async (config) => {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor if there are some
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response date
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
