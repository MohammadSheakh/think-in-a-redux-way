// eita hobe ekta function ..
// amar jeta lagbe .. sheta hocche USERS NODE er full array ta ..
// mane ke ke participants ase .. shei total participants er array er list ta lagbe ..
// and actually amar logged in Email ta konta .. sheta lagbe .. taholei ami filter kore ber kore ante parbo ..
const getPartnerInfo = (participants, email) => {
    return participants.find((participant) => participant.email !== email); // ami takei return korbo .. jar email amar email er shathe na mile ..
};

export default getPartnerInfo;

/**
 * ami chara onno jini participant asen .. ei conversation er ..tar chobi dekhabo .. and tar nam dekhabo ..
 * ekhon amader data base amar information o deowa ase .. abar participant er information o deowa ase ..
 * ekhon ke ami ar ke participant .. eta kintu bole deowa nai .. amake decetion nite hobe .. ami to logged in
 * user .. amar Email ta jani .. ami kintu "USERS NODE" theke filter kore ber korte pari je ..ami chara onno
 * jei object ta ase .. sheta hocche participant er information .. taholei to hoye jay .. so, amra shei kaj tai korbo
 * karon amar avatar o dekhate hobe .. oi participant er .. tahole shudhu oi participant er information dekhanor
 * jonno .. ami jeta korbo..  ami ekta kaj kori .. jeno ami oita reuse korte pari next time e .. ami src er moddhe
 * utils nam e ekta folder nicchi .. tar moddhe utility function likhsi ..
 */
