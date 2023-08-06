import axios from "axios";

//gets the local storage token
const authToken = localStorage.getItem("Authorization");
let reqHeader = {}
if(authToken!==null){
     reqHeader = {Authorization:authToken}
}

const BaseClient = axios.create(
     {
          baseURL:'http://127.0.0.1:8000/',
          timeout:4000,
          withCredentials:false,
          responseType:'json',
          headers:reqHeader
     }
)

export default BaseClient;