import axios from "axios";

const axiosInstance = axios.create({
    // amra amader ekta axiosInstance banacchi ..
    baseURL: "http://localhost:9000",
});
// ami axios use korar jonno shora shori axios ke na ene .. ami amar axios instance ta ke
// anbo .. API gula te
export default axiosInstance;

/**
 * axios ke use korle amra basic kichu benefits pai ..
 * fetch er khetre duita kaj korte hoy .. response ta string akare pai ..tar por shekhan
 * theke response.json kore nite hoy ..tarpor amra actual data ta pai ..
 *
 * axios er shubidha hocche apnake dot json call korte hoy na ..shorashori ek bar ei
 * response er moddhe jinish ta peye jaben
 *
 * axios er aro kichu shubidha ase .. jemon .. request er moddhe intercept korte paren
 * apnar jei base URL ta .. sheta set kore bar bar call kora jay .. fetch er khetre
 * bar bar url ta likhte hoy
 *
 */
