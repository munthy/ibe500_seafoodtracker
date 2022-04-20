async function _sendTx(dataObject){
    const apiURL = "http://localhost:4500/broadcasttransaction" //"http://vargrym.ddns.net:4500/broadcasttransaction";

    const response = await fetch(apiURL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObject)
    })

    return response.json();
}

async function _getLotContent(lotIdAsString){
    const apiURL = `http://localhost:4500/lotsummary/${lotIdAsString}`;//`http://vargrym.ddns.net:4500/lotsummary/${lotId}`;
    
    const response = await fetch(apiURL, {
        method: "GET",
    })
    return response.json();
}

exports.sendTx = _sendTx;
exports.getLotContent = _getLotContent;