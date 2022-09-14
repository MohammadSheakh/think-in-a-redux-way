import { COLORCHANGED, STATUSCHANGED } from "./actionTypes";

// ekhon amar kaj hocche action creator file ta banano ....

// ekhane amar ekta color select kora lagbe .. abar shei color e second time press korle
// shei color ta remove o kora lagbe .. jeta ke amra boltesi toggol ..
// kono color e jodi select kora na thake .. tokhon shob gula todo e show korbe
export const colorChanged = (color, changeType) => {
    return {
        type: COLORCHANGED,
        payload: {
            color,
            changeType,
        },
    };
};

// ekhane toggol er kono shomossha nai ... mane select , unselect er kono shomossha nai
// ei khetre status ta nilei hoye jabe arki .. status thik na .. filter er jei value ta
// sheita
export const statusChanged = (status) => {
    return {
        type: STATUSCHANGED,
        payload: {
            status,
        },
    };
};

// ekhon amader kaj reducer gula banano
