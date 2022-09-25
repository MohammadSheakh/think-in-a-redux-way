import axios from "../../utils/axios";
// axios intance ta niye ashlam .. jeta create korsilam 
/**
 * Shob gulai hocche Asynchronous Function 
 * 
 */
export const getTransactions = async () => {
    // server e 9000 url e hit kore transaction
    // gula niye asha .. 
    const response = await axios.get("/transactions");

    return response.data;
};
/**
 * amra expect korbo.. addTransaction API ta je call korbe ..ultmately kono ekta 
 * async thunk function ami amar slice e banabo .. shei thunk ta ultimately addTransaction
 * ke call korbe .. call korar shomoy .. she form er data ta pass kore dibe ..
 * shei data ta ami data object er moddhe pabo ,.   
 */
export const addTransaction = async (data) => {
    // dot post hobe .. karon amra 
    // create korbo .. 
    const response = await axios.post("/transactions", data);
    // 2nd parameter e ekta object diye hoy .. 
    // ami expect korbo .. addTransaction .. 
    // amake pura object ta diye dibe .. 
    return response.data;
};

// kon transactions er data edit korbo 
// sheta track rakhar jonno id ta lagbe .. 
export const editTransaction = async (id, data) => {
    const response = await axios.put(`/transactions/${id}`, data);

    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = axios.delete(`/transactions/${id}`);

    return response.data;
};
