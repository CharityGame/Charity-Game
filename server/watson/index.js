const router = require('express').Router()
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
module.exports = router

const wml_credentials = new Map();
wml_credentials.set("url", process.env.WML_URL);
wml_credentials.set("username", process.env.WML_USERNAME);
wml_credentials.set("password", process.env.WML_PASSWORD);

let token = '', wmlToken = '';

function apiGet(url, username, password, loadCallback, errorCallback){
    const oReq = new XMLHttpRequest();
    const tokenHeader = "Basic " + btoa((username + ":" + password));
    const tokenUrl = url + "/v3/identity/token";

    console.log('in get 1', tokenHeader, tokenUrl)

    oReq.addEventListener("load", loadCallback);
    oReq.addEventListener("error", errorCallback);
    oReq.open("GET", tokenUrl);
    oReq.setRequestHeader("Authorization", tokenHeader);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    oReq.send();
}

async function apiPost(scoring_url, token, payload, loadCallback, errorCallback){
    console.log('in post 1')
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", loadCallback);
    oReq.addEventListener("error", errorCallback);
    oReq.open("POST", scoring_url);
    oReq.setRequestHeader("Accept", "application/json");
    oReq.setRequestHeader("Authorization", token);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    oReq.send(payload);
}

const loadCallback = async function (res) {
        console.log('in load ini')
        let parsedGetResponse;
        try {
            console.log('in load');
            parsedGetResponse = JSON.parse(this.responseText);
            console.log('in load after res', parsedGetResponse);
        } catch(ex) {
            // TODO: handle parsing exception
            console.log('in watson apiGet 1st catch', ex);
        }
        if (parsedGetResponse && parsedGetResponse.token) {
            console.log('in token', parsedGetResponse.token);
            token = parsedGetResponse.token
            wmlToken = "Bearer " + token;
        }else {
            console.log("Failed to retrieve Bearer token");
        }
    }

router.get('/', async (req, res, next) => {
    try{
        await apiGet(wml_credentials.get("url"),
                       wml_credentials.get("username"),
                       wml_credentials.get("password"),
                       loadCallback, 
                       function (err) {
                           console.log('final', err);
                       }
                    )

        const payload = '{"fields": ["EVENT NAME", "ZIP CODE", "DATE", "TIME", "EVENT DURATION", "CATEGORY", "USER ZIP CODE", "SEARCH DATE", "SEARCH TIME", "SEARCH DURATION", "SEARCH CATEGORY"], "values": [[1, 1234, 104, 14, 3, "FOOD", 1234, 104, 14, 3, "FOOD"]]}';
        const scoring_url = process.env.SCORING_URL;
            
        apiPost(scoring_url, wmlToken, payload, function (resp) {
            console.log('in post')
            let parsedPostResponse;
            try {
                parsedPostResponse = JSON.parse(this.responseText);
                console.log('in post try', parsedPostResponse);
            } catch (ex) {
                // TODO: handle parsing exception
                console.log('in watson apiGet 2nd catch', ex);
            }
            console.log("Scoring response");
            console.log(parsedPostResponse);
            res.status(200).send(parsedPostResponse);
        })
    }catch(err){
        next(err)
    }
    
})
