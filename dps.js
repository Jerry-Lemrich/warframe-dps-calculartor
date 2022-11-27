/**
 * @author      jerry lemrich
 * @version     1.0
 * @since       26.11.22
 *
 * http://usejsdoc.org/
 */
(function (document) {
  "use strict";

  /** Eléments HTML globaux **/
  const fordps = document.querySelector("form"); // formulaire
  const divMessage = document.getElementById("message"); // div pour message d'erreurs
  const divResult = document.getElementById("result"); // div pour confirmation de réservation

  /* Elements du formulaire */
  const lisTypeArme = document.getElementById("lis_Type-weapons");

  const txt_critChance = document.getElementById("txt_critChance");
  const txt_critMulti = document.getElementById("txt_critMulti");
  const txt_statut = document.getElementById("txt_statut");
  const txt_fireRate = document.getElementById("txt_fireRate");
  const txt_impact = document.getElementById("txt_impact");
  const txt_Perfo = document.getElementById("txt_Perfo");
  const txt_slash = document.getElementById("txt_slash");
  const txt_tox = document.getElementById("txt_toxinDamage")
  const txt_heatDamage = document.getElementById("txt_heatDamage");
  const txt_electricDamage = document.getElementById("txt_electricDamage");
  const txt_coldDamage = document.getElementById("txt_coldDamage");
  const txt_radiationDamage = document.getElementById("txt_radiationDamage");
  const txt_magneticDamage = document.getElementById("txt_magneticDamage");
  const txt_blastDamage = document.getElementById("txt_blastDamage");
  const txt_viralDamage = document.getElementById("txt_viralDamage");
  const txt_corrosiveDamage = document.getElementById("txt_corrosiveDamage");
  const txt_gasDamage = document.getElementById("txt_gasDamage");
  const txt_multishot = document.getElementById("txt_multishot");
  const txt_magazineSize = document.getElementById("txt_magazineSize");
  const txt_reload = document.getElementById("txt_reload");
  const otherfield = document.getElementById("other")

  /* Elements de la confirmation*/
  const imgPhotoHotel = document.getElementById("photo");
  const h2typeArme = divResult.querySelector("h2");
  const spanDamagePerShot = document.getElementById("DamagePerShot");
  const spanBrustDps =  document.getElementById("BrustDps");
  const spansustainDPS = document.getElementById("sustainedDPS");



  function getTypeWeapon() {
    return lisTypeArme.value;
  }


  function getCritChance() {
    return parseFloat(txt_critChance.value);
  }
  function getCritdamage() {
    return parseFloat(txt_critMulti.value);
  }
  function getStatut() {
    return parseFloat(txt_statut.value);
  }
  function getfireRate() {
    return parseFloat(txt_fireRate.value);
  }
  function getimpact() {
    return parseFloat(txt_impact.value);
  }
  function getperfo() {
    return parseFloat(txt_Perfo.value);
  }
  function getslash() {
    return parseFloat(txt_slash.value);
  }
  function getox() {
    return parseFloat(txt_tox.value);
  }
  function getheat() {
    return parseFloat(txt_heatDamage.value);
  }

  function getelec() {
    return parseFloat(txt_electricDamage.value);
  }
  function getcold() {
    return parseFloat(txt_coldDamage.value);
  }
  function getrad() {
    return parseFloat(txt_radiationDamage.value);
  }
  function getemag() {
    return parseFloat(txt_magneticDamage.value);
  }
  function getblast() {
    return parseFloat(txt_blastDamage.value);
  }
  function getviral() {
    return parseFloat(txt_viralDamage.value);
  }
  function getcoro() {
    return parseFloat(txt_corrosiveDamage.value);
  }
  function getgas() {
    return parseFloat(txt_gasDamage.value);
  }
  function getmuilts() {
    return parseFloat(txt_multishot.value);
  }
  function getmaga() {
    return parseFloat(txt_magazineSize.value);
  }
  function getreload() {
    return parseFloat(txt_reload.value);
  }

  console.log(getox());


  /**
   * Valide la saisie utilisateur
   *
   * @returns {String}    Chaine vide si pas d'erreur
   *                      Message d'erreur au format HTML
   */
  function valideSaisie() {

    let erreurs = "";

    // Test choix arme
    if (getTypeWeapon() === "0") {
      erreurs += "<li>choose a type</li>";
    }

    // Test nombre de chambres
    let donnee = getCritChance()+getCritdamage()+getStatut()+getfireRate()+getimpact()+getperfo()+getslash()
    +getheat()+getelec()+getcold()+getrad()+getemag()+getblast()+getviral()+getcoro()+getgas()+getmuilts()+getmaga()
        +getreload();

    /*if (Number.isNaN(donnee) ) {
      erreurs += "<li>Please put only number</li>";
    }*/

    return erreurs;
  }
function calctotaldamage(){

  var totalDamage = getimpact() + getperfo() + getslash()
      + getox() + getheat() + getelec() + getcold()
      + getrad() + getemag() + getblast() + getviral() + getcoro() + getgas();
  return totalDamage
}
  function calcDamagePerShot(){

    var damagePerShot = calctotaldamage() * (1.0 + getCritChance() * (getCritdamage() - 1.0)) * (1.0 + getmuilts());
    return damagePerShot
  }

  function calcBurstDamage(){

    var burstDPS = calcDamagePerShot() * getfireRate();
    return burstDPS

  }
 function calcSustainedDps(){


   var sustainedDPS = calcBurstDamage() * (getmaga() / getfireRate()) / (getmaga() / getfireRate() + getreload());

    return sustainedDPS

  }

  /**
   * Affiche la confirmation de réservation
   */
  function showResult() {

    // Photo hôtel
    imgPhotoHotel.src = "images/"
        + getTypeWeapon().toLowerCase()
        + ".jpg";

    // Nom de l'hôtel
    h2typeArme.innerText = getTypeWeapon();

    // Chambre
    spanDamagePerShot.innerText = calcDamagePerShot().toString();
    spanBrustDps.innerText = calcBurstDamage().toString();

    divResult.style.display = "block";

    if (getTypeWeapon() === "gun") {

    // Liste des options

      spansustainDPS.innerHTML = "Sustained DPS: "+ calcSustainedDps().toString();

      spansustainDPS.style.display = `block`;
    }
    else{
      spansustainDPS.style.display = "none";
    }

  }

  /**
   * Fonction appellé lors de l'envoi du formulaire
   * Test la saisie et affiche la confirmation
   *
   * @param event Objet représentant l'événement
   */
  function claculate(event) {
    // Stoppe l'envoi du formulaire
    event.preventDefault();

    // Vide et cache les message d'erreurs
    divMessage.innerHTML = "";
    divMessage.style.display = "none";

    // Valide les saisies du visiteur
    let erreurs = valideSaisie();

    /*
    Si erreur de saisie :
        - crée et affiche les messages d'erreurs
        - cache la réservation
        - sort de la fonction, fin du script
     */
    if (erreurs) {
      divMessage.innerHTML = "<ul>" + erreurs + "</ul>";
      divMessage.style.display = "block";

      divResult.style.display = "none";

      return;
    }

    // Créer et affiche la confirmation de la réservation
    showResult();
  }

  /** Evénements du formulaire : envoi et réinitialisation **/
  fordps.addEventListener("change", function (){
   if (getTypeWeapon() === "gun" || getTypeWeapon() === "0")
    otherfield.style.display = "block"
    else{
      otherfield.style.display ="none"
   }

  })
  fordps.addEventListener("submit", claculate);

  fordps.addEventListener("reset", function () {
    divMessage.style.display = "none";
    divResult.style.display = "none";
  });

}(document));