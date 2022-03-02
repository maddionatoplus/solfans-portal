import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { v4 as uuidv4 } from 'uuid';

class MyUtil{

    static printZeroAhead(value, length){ 
        var toRet = value.toString();
        while(toRet.length < length){
            toRet = "0" + toRet;
        }
        console.log(toRet);
        return toRet;
    }
 
    static printPriceString(lamports, solanaPrice){
        return lamports + " = " + lamports/LAMPORTS_PER_SOL + " SOL = " + MyUtil.convertLamportToUSD(lamports, solanaPrice) + " USD";
    }

    static timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = date + ' ' + month + ' ' + year + ' ' + this.printZeroAhead(hour, 2) + ':' + this.printZeroAhead(min, 2) ;
        return time;
    }

    static isSubscriptionValid(subscription){
        var subscriptionEnd = new Date(subscription.subscriptionEnd.toNumber() * 1000);
        return subscriptionEnd > Date.now();
    }

    static isImage(value){
        var imgExtensions = ['jpg',"jpeg",'png','bmp']; 
        if(imgExtensions.includes(value.split(".").pop()))
            return true;
        return false;
    }

    static isVideo(value){
        var videoExtensions = ['mp4']; 
        if(videoExtensions.includes(value.split(".").pop()))
            return true;
        return false;
    }

    static getSolanaPrice = async () => {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`,
          {
            method: "GET",
          }
        );
      
        const data = await response.json();
        return data.solana;
    };
    
    
    static toFixed(x) {
        var length = 9;
        if(x > 0.01)
            length = 2;
        return Number(x).toFixed(length).replace(/\.?0+$/,"")
    }

    static convertLamportToUSD(lamports, solanaPrice){
        return MyUtil.toFixed((lamports / LAMPORTS_PER_SOL) * solanaPrice);
    }

    static isExtensionValid(fileName, validExtensions){
        console.log(fileName);
        var extension = fileName.split(".").pop();
        return validExtensions.includes(extension);
    }

    static randomizeName(fileName){
        var extension = fileName.split(".").pop();
        return uuidv4() + "." + extension;
    }

    static toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = e => {
            resolve(e.target.result);
        };
        reader.onerror = error => reject(error);
    });

    static hasUserLiked(userVotes, userAddress){ 
        return userVotes.map((userVote) => userVote.toString()).includes(userAddress.toString());
    }

    static convertPriceInSol(monthPrice){
        return monthPrice / 1000
    }

    static convertPriceInMilliSol(monthPrice){
        return monthPrice * 1000
    }
}

export {MyUtil}