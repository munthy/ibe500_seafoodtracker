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

export class DataAnalysis{
    static ReturnCompanyStats(txDataArray){
        let lotSummary = {};	
        for (let txData of txDataArray){
            initializeCatchInfo(txData);
            initializeBuyerInfo(txData);
            initializeSellerInfo(txData);
            addSalesInfo(txData);
            addPurchasedFromInfo(txData);
            addSoldToInfo(txData);
        }

        return lotSummary;
    
        function initializeCatchInfo(tx){
			if (tx.txType !== "catch") {return;}
			// lotSummary.product = tx.product;
			// lotSummary.lotId = tx.lotId;
			if (lotSummary[tx.buyer] === undefined){
				lotSummary[tx.buyer] = {};				
			}
			lotSummary[tx.buyer].purchased = tx.quantity; //Choice made to represent catch as "buying" fish from the sea; easier to parse.            
        }
    
        function initializeBuyerInfo(tx){
            if (tx.txType !== "purchase"){return;}
			if(lotSummary[tx.buyer] === undefined){
                lotSummary[tx.buyer] = {};
                lotSummary[tx.buyer].purchased = 0;
            }
        }
    
        function initializeSellerInfo(tx){
            if (tx.txType !== "sale"){return;}
			if(lotSummary[tx.seller] === undefined){
                lotSummary[tx.seller] = {};
                lotSummary[tx.seller].sold = 0;
            }
        }
    
        function addSalesInfo(tx){
            if (tx.txType === "purchase"){
                if (lotSummary[tx.buyer].purchased === undefined){lotSummary[tx.buyer].purchased = 0}
                lotSummary[tx.buyer].purchased += tx.quantity;
            }            

            if (tx.txType === "sale"){
                if (lotSummary[tx.seller].sold === undefined){lotSummary[tx.seller].sold = 0}
                lotSummary[tx.seller].sold += tx.quantity;
            }
        }
    
        function addSoldToInfo(tx){
            if (tx.txType !== "sale"){return;}
            if (lotSummary[tx.seller].soldTo === undefined) {lotSummary[tx.seller].soldTo = {}};
            
            lotSummary[tx.seller].soldTo[tx.buyer] = {};
            lotSummary[tx.seller].soldTo[tx.buyer] = {
                "product":tx.product,
                "quantity":tx.quantity
            };
        }

        function addPurchasedFromInfo(tx){
            if (tx.txType !== "purchase"){return;}
            if (lotSummary[tx.buyer].purchasedFrom === undefined) {lotSummary[tx.buyer].purchasedFrom = {}};
            
            lotSummary[tx.buyer].purchasedFrom[tx.seller] = {};
            lotSummary[tx.buyer].purchasedFrom[tx.seller] = {
                "product":tx.product,
                "quantity":tx.quantity
            };
        }
    }

	static CompareQuantity(lotSummary, seller, purchaser){
		try{
			if (lotSummary[seller].soldTo[purchaser].quantity === lotSummary[purchaser].purchasedFrom[seller].quantity){
				return true;
			}
			return false;
		}catch(error){
			return false;
		}
	}
	
	static CompareProduct(lotSummary, seller, purchaser){
		try{
			if (seller === undefined || purchaser === undefined){return false;}
			if(lotSummary[seller].soldTo[purchaser].product === lotSummary[purchaser].purchasedFrom[seller].product){
				return true;
			}
			return false;
		}catch(error){
			return false;
		}		
	}
}