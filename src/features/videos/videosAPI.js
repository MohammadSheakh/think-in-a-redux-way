import axios from "../../utils/axios";
// amader jei API ta .. shekhan e ami expect korbo ..ekhane amar tags o ashbe 
// abar search o ashbe .. 
export const getVideos = async (tags, search) => {
    // tags ar search er upor base kore amake ekhon query string ta banay dite 
    // parlei hoilo .. 
    let queryString = "";

    if (tags?.length > 0) {
        queryString += tags.map((tag) => `tags_like=${tag}`).join("&");
    }

    if (search !== "") {
        queryString += `&q=${search}`;
    }
    // ekhon amader ekhane filter pass korte hobe ... jehetu ki content load korte
    // hobe , sheta jehetu filter er upor depend kortese .. 
    const response = await axios.get(`/videos/?${queryString}`);

    return response.data;
};
