export async function sendTx(dataObject){
    const apiURL = "http://vargrym.ddns.net:4500/broadcasttransaction";

    const response = await fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject)
    })

    return response.json();
}

export async function getLotContent(lotIdAsString){
    const apiURL = `http://vargrym.ddns.net:4500/lotsummary/${lotIdAsString}`;
    
    const response = await fetch(apiURL, {
        method: "GET",
    })
    return response.json();
}

export async function getLotData(lotIdAsString){
    const apiURL = `http://vargrym.ddns.net:4500/getlotdata/${lotIdAsString}`;
    
    const response = await fetch(apiURL, {
        method: "GET",
    })
    return response.json();
}