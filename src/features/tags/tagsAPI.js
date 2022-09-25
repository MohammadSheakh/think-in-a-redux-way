import axios from "../../utils/axios";
// axios er isntance ta ekhaneo lagbe .. 

export const getTags = async () => {
    const response = await axios.get("/tags");
    //backend server e tags namok url e hit korte hobe 
    return response.data; // ekhaneo response.data er moddhe she amake data diye dibe .. 
};
