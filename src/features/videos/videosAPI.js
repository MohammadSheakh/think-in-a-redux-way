import axios from "../../utils/axios";
// ami axios use korar jonno shora shori axios ke na ene .. ami amar axios instance ta ke
// anbo ..

export const getVideos = async () => {
    // ei file e amra data fetch korbo
    // eta ekta async function .. karon er moddhe ami data anbo
    const response = await axios.get("/videos"); // ekhan e axios ke call korbo
    // eta amar get request .. tai axios.get call korte hobe ..
    // and amar base url already bole deowa ase ..tarpor /videos .. eta hobe amar
    // API URL ta ..

    // fetch o use korte paren .. abar axios o use korte paren .. ebar amra axios use korbo
    // npm i axios

    return response.data; // ekhan theke amake ekta promise return kore dite hobe

    // amar ar response.json call kora lagbe na .. ami jeta pabo ..
    // she response.data er moddhe .. axios data ta diye dey ..

    // ei function ta ultimately ekta promise return kore .. shetai amar
};
