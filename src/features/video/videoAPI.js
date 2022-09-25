import axios from "../../utils/axios";

export const getVideo = async (id) => {
    // id ta parameter e pete hobe .. 
    const response = await axios.get(`/videos/${id}`);

    return response.data;
};
