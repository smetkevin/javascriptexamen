"use strict";

// OPGAVE 1:
function initValidatie() {
    let naam = document.getElementById("naam");
    naam.addEventListener("blur", naamValidatie, false);

    let rijksregister = document.getElementById("rijksregister");
    rijksregister.addEventListener("blur", rijksregisterValidatie, false);

    let gok = document.getElementById("gok");
    gok.addEventListener("blur", gokValidatie, false);

    let submitButton = document.getElementById("verzend");
    submitButton.addEventListener("click", formValidatie, false);
    console.log("submitButton", submitButton);
}

// OPGAVE 2:
function naamValidatie() {
    let naam = document.getElementById("naam").value;
    let naamFout = document.getElementById("naamfout");

    if (!isGeldigeNaam(naam)) {
        naamFout.innerHTML = "Begin de naam met een hoofdletter!";
        return false;
    } else {
        naamFout.innerHTML = "";
        return true;
    }

    function isGeldigeNaam(naam) {
        const regExp = /^[A-Z]{1}[a-z]*$/;
        return regExp.test(naam);
    }
}

// OPGAVE 3:
function isGeldigRijksregister(rijksregister) {
    const regExp = /^[0-9]{2}\.0[1-9]\.0[1-9]\-[0-9]{3}\.[0-9]{2}$|^[0-9]{2}\.0[1-9]\.[1-2][1-9]\-[0-9]{3}\.[0-9]{2}$|^[0-9]{2}\.0[1-9]\.3[0-1]\-[0-9]{3}\.[0-9]{2}$|^[0-9]{2}\.1[0-2]\.0[1-9]\-[0-9]{3}\.[0-9]{2}$|^[0-9]{2}\.1[0-2]\.[1-2][1-9]\-[0-9]{3}\.[0-9]{2}$|^[0-9]{2}\.1[0-2]\.3[0-1]\-[0-9]{3}\.[0-9]{2}$/;
    return regExp.test(rijksregister);
}

function rijksregisterValidatie() {

    let rijksRegisternummer = document.getElementById("rijksregister").value;
    let rijksRegisterFout = document.getElementById("rijksregisterfout");

    if (!isGeldigRijksregister(rijksRegisternummer)) {
        rijksRegisterFout.innerHTML = "Gebruik correct formaat";
        return false;
    }
    else {
        rijksRegisterFout.innerHTML="";
        return true;
    }
}

// OPGAVE 4:
function gokValidatie() {
    let gok = document.getElementById("gok").value;
    let gokFout = document.getElementById("gokfout");

    if (!isGeldigeGok(gok)) {
        gokFout.innerHTML = "Gok moet tussen 1 en 6 zijn.";
        return false;
    }
    else {
        gokFout.innerHTML = "";
        return true;
    }

    function isGeldigeGok(gok) {
        const regExp = /[1-6]/;
        return regExp.test(gok);
    }
}

// OPGAVE 5:
function formValidatie(event) {
    let errortext = document.getElementById("formulier");

    if(!naamValidatie() || !rijksregisterValidatie() || !gokValidatie()){
        errortext.innerHTML = "Geen geldige invoer!";
        event.preventDefault();
    }
}

// --------------------------------------------------------------------------
// Voor de pagina verzonden.html
//---------------------------------------------------------------------------
let poging;

// OPGAVE 6:
function wijzigKopEnVerbergArtikels() {
    let kop = document.querySelector("p");
    kop.classList.add('kop');

    let articles = document.getElementsByTagName("article");
    for (let i = 0; i < articles.length; i++) {
        articles[i].style.display = "none";
    }
}

// OPGAVE 7:
class Beurt {
    dobbelsteenWorp = 4;

    constructor(naam, rijksregisternummer, gok) {
        this.naam = naam;
        this.rijksregisternummer = rijksregisternummer;
        this.gok = gok;
    }

    isGewonnen() {
        return this.gok === this.dobbelsteenWorp.toString();
    }

    txtResultaat() {
        let text = '';
        if(this.isGewonnen()){
            text = "Er werd juist gegokt!";
        }
        else {
            text =  "Er werd helaas verkeerd gegokt(de dobbelsteen toonde " + this.dobbelsteenWorp.toString() + " ogen).";
        }
        return text;
    }

    getLeeftijd() {
       let rijksregister =  this.rijksregisternummer.substring(0,2);
       const date = new Date();
       let leeftijd;
       if(rijksregister > 18) {
           leeftijd = date.getFullYear() - (parseInt(rijksregister) +1900);
       }
       else {
           leeftijd = date.getFullYear() - (parseInt(rijksregister) + 2000);
       }

       return leeftijd;
    }

    toString() {
        let leeftijd = this.getLeeftijd() + "-jarige " + this.naam + " met rijksregisternr " + this.rijksregisternummer + " gokte " + this.gok + " ogen.";
        return leeftijd + "<br />" + this.txtResultaat();
    }

}

// OPGAVE 8:
function getParam(name) {
// Deze functie wordt gebruikt om parameters door te geven tussen pagina's
    let queryString = decodeURIComponent(location.search.replace(/\+/g, " "));
    let regex = new RegExp(name + "=([^&*]+)");
    let result = regex.exec(queryString);
    if (result) {
        return result[1];
    }
    return null;
}

// OPGAVE 9:
function initVerzonden() {
    window.addEventListener('load', wijzigKopEnVerbergArtikels, false);
    poging = new Beurt(getParam('naam'), getParam('rijksregister'), getParam('gok'));

    let textInput = document.getElementsByTagName('h3');
    textInput[0].innerHTML = poging.toString();

    werpDobbelsteen();
    window.addEventListener('load',werpDobbelsteen,false);
}

// OPGAVE 10:
function werpDobbelsteen() {
    //opgave 10 nog uitwerken.
    let worp = Math.floor((Math.random()*6) + 1);

    console.log(poging.gok);

    let articles = document.getElementsByTagName("article");
    articles[poging.gok-1].style.display = "block";

    if(poging.isGewonnen()) {
        console.log("jackpot");
        let jackpot = document.querySelector('article img#jackpot');
        console.log("document jackpot", jackpot);
        jackpot.style.display = "block";
    }
    else {
        console.log("verlies");
        let verlies = document.querySelector('article img#verloren');
        verlies.style.display = "block";
    }


// laat onderstaande lijn als laatste lijn in deze functie staan
    console.log(poging.toString());
}
