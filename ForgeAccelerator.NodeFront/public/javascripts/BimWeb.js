frontEnd = "http://bimwebdev.s3-website-sa-east-1.amazonaws.com/#/login"
baseUrl = "https://bimwebapi.projetabim.com.br";



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

    console.log("finalizou");
}

function successLogin(res) {
    console.log(res);
}
