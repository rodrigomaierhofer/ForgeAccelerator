frontEnd = "http://bimwebdev.s3-website-sa-east-1.amazonaws.com/#/login"
baseUrl = "https://bimwebapi.projetabim.com.br";
let projectId = 53;
let loginData;

//just a comment to test new github account




userName = "rodrigo@projetabim.com.br";
pwd = "projetabim16";


function bimwebLogin() {
    console.log("iniciou");
    url = baseUrl + "/login/";
    //url = baseUrl + "pokemon/ditto/";
    data = {
        "email": userName,
        "password": pwd
    }


    $.ajax({
        type: "POST",
        crossDomain: true,
        url: url,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        success: successLogin,
        dataType: "json"
    });
}

function successLogin(res) {
    loginData = res.data;
}


function bimwebForges() {
    console.log("iniciou forges");
    url = baseUrl + "/forge/project/" + projectId;
   

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: url,
        headers: {
            "Content-Type": "application/json",
            token: loginData.token
        },
        
        success: successForges
    });

    console.log("finalizou");
}

function successForges(res) {
    let divList = document.getElementById("filesList");
    res.data.forEach(
        (file) => {
            console.log("file");
            //let file = JSON.parse(fileString);
            let fileLink = document.createElement("a");
            fileLink.href = "#";
            fileLink.text = file.name;
            fileLink.onclick = () => { loadForge(file.urnCripted) }            
            divList.appendChild(fileLink);
            divList.appendChild(document.createElement("br"));
        }
    )
    
}


function loadForge(urnCripted) {
    documentId = 'urn:'+urnCripted;
    startViewer();
}

function getForgeToken(callback) {
    console.log("iniciou pegar token");
    url = baseUrl + "/forge/token/project/" + projectId;

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: url,
        headers: {
            "Content-Type": "application/json",
            token: loginData.token
        },

        success: callback
    });
}