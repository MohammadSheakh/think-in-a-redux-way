import axios from "axios";
// nijeder ekta axios instance baniye nilam
// ekta baseURL diye 
const axiosInstance = axios.create({
    baseURL: "http://localhost:9000",
});

export default axiosInstance;
// ekta object pass korte pari .. tar moddhe 
// ekta base URL bole dibo arki 

// axios instance amader bivinno jaygay use 
// korte hobe 