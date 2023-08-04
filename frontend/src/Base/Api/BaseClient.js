import axios from "axios";

const BaseClient = axios.create(
     {
          baseURL:'http://127.0.0.1:8000/',
          timeout:4000,
          withCredentials:false,
          responseType:'json',
     }
)

export default BaseClient;