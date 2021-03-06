// Au chargement  de la page, le panier est rempli avec les donnés du localstorage

window.onload = function () {

    const cartBox = document.querySelector('.cartBox');

    const cardBoxTable = cartBox.querySelector('table');

    //création du panier en récupérant les donnés du localStorage
    const localItems = JSON.parse(localStorage.getItem("items"));

    let tableData = '';
    //première ligne du tableau 
    tableData += `<thead><tr class="table-title"><th>Référence</th><th>Produit</th><th>Quantités</th><th>Prix Unitaire</th></tr></thead>`;

    //message pour tableau vide
    if (localItems[0] == null) {
        tableData += `<tr class="table-content"><td colspan="5">Pas de produits dans le panier !</td></tr>`
    } else {
        //création des lignes du tableau d'après les éléments du local storage
        localItems.forEach(function (data) {
            tableData += `<tr class="table-content"><th>${data.id}</th><th>${data.name}</th><th>${data.no}</th><th>${data.price}</th><th class="suppr"><a href="#" onclick=Delete(this);>Supprimer</a></th></tr>`;
        });

    };


    //calcul du prix total du panier
    let Total = 0;

    for (i = 0; i < localItems.length; i++) {
        Total += localItems[i].price * localItems[i].no
    }

    //ajout du total dans le tableau

    tableData += `<tfoot><tr class="total"><th>Prix Total</th><th></th><th></th><th>${Total} € </th></tr></tfoot>`
    cardBoxTable.innerHTML = tableData;


    //indication du nombre de produits dans le panier en entête    

    const iconShoppingP = document.querySelector('.iconShopping p');
    let no = 0;

    for (let i = 0; i < localItems.length; i++) {
        no = no + localItems[i].no;
        iconShoppingP.innerHTML = no;
    }

}


//suppression d'un produit du panier
function Delete(e) {
    let items = [];
    //au clic zur "supprimer" récupération du localStorage et creation d'un nouveau tableau sans l'article supprimé avec .filter
    JSON.parse(localStorage.getItem('items')).filter(data => {
        if (data.id != e.parentElement.parentElement.children[0].textContent) {
            items.push(data);
        }
    });
    //nouveau local storage sans l'article supprimé
    localStorage.setItem('items', JSON.stringify(items));
    window.location.reload();
};



// Récupération des informations saisies dans le formulaire 
const form = document.getElementById("form");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const addresse = document.getElementById("adresse");
const ville = document.getElementById("ville");
const email = document.getElementById("email");



// Contrôle du nom pendant la saisie
var validiteNom = "";

nom.addEventListener("input", function (e) {

    var regexName = /^[a-zA-Zéèïî][a-zéèêàçîï]+([-'\s][a-zA-Zéèïî][a-zéèêàçîï]+)?/;
    if (!regexName.test(e.target.value)) {
        validiteNom = "Nom invalide";
    } else {
        validiteNom = ""
    }
    document.getElementById("wrongName").textContent = validiteNom;
});

// Contrôle du prénom pendant la  saisie

var validitePrenom = "";

prenom.addEventListener("input", function (e) {

    var regexForname = /^[a-zA-Zéèïî][a-zéèêàçîï]+([-'\s][a-zA-Zéèïî][a-zéèêàçîï]+)?/;
    if (!regexForname.test(e.target.value)) {
        validitePrenom = "Prenom invalide";
        validForm = false;
    } else {
        validForm = true;
        validitePrenom = "";
    }
    document.getElementById("wrongForname").textContent = validitePrenom;
});



// Contrôle du courriel pendant la saisie

var validiteCourriel = "";

email.addEventListener("input", function (e) {

    var regexCourriel = /.+@.+\..+/;
    if (!regexCourriel.test(e.target.value)) {
        validiteCourriel = "email invalide";
        validForm = false;
    } else {
        validForm = true;
        validiteCourriel = "";
    }
    document.getElementById("wrongEmail").textContent = validiteCourriel;
});


// Contrôle de l'adresse pendant la saisie
var validiteAdresse = "";

adresse.addEventListener("input", function (e) {

    var regexAdress = /[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*/;
    if (!regexAdress.test(e.target.value)) {
        validiteAdresse = "Adresse invalide";
        validForm = false;
    } else {
        validForm = true;
        validiteAdresse = "";
    }
    document.getElementById("wrongAdress").textContent = validiteAdresse;
});


// Contrôle de la ville pendant la saisie
var validiteVille = "";

ville.addEventListener("input", function (e) {

    var regexVille = /^[a-zA-Zéèïî][a-zéèêàçîï]+([-'\s][a-zA-Zéèïî][a-zéèêàçîï]+)?/;
    if (!regexVille.test(e.target.value)) {
        validiteVille = "Ville invalide";
        validForm = false;
    } else {
        validForm = true;
        validiteVille = "";
    }
    document.getElementById("wrongCity").textContent = validiteVille;
});



// Requèté POST avec les éléments du panier + coordonnés du formulaire  :
form.addEventListener("submit", function (event) {
    event.preventDefault()
    // Test de l'absence de messages d'erreurs dans le formulaire avant envoi de la requète 
    if (validiteNom.length + validitePrenom.length + validiteCourriel.length + validiteAdresse.length + validiteVille.length == 0) {

        ///Creation d'un objet contact contenant les informations de contact saisie par l'utilisateur
        const contact = {
            lastName: nom.value,
            firstName: prenom.value,
            address: addresse.value,
            city: ville.value,
            email: email.value
        }

        // Création d'un objet "products" qui contient les informations du panier
        monPanier = [];
        monPanier = JSON.parse(localStorage.getItem('items'));
        const products = [];
        for (let i = 0; i < monPanier.length; i++) {
            products.push(monPanier[i].id);
        }

        let data = { contact, products } // Création d'un objet global "data" qui contient les 2 tableaux à transmettre au serveur

        let achat = JSON.stringify(data); //On converti notre objet global en format JSON

        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {//gestionnaire d'évenement invoqué à chaque fois que la ready state change.
            if (this.readyState == XMLHttpRequest.DONE) {
                //Quand la requète est terminé, on recupère la réponse  
                let confirmation = JSON.parse(this.responseText);
                console.log(confirmation);
                //on enregistre la réponse dans le local storage pour l'afficher dans confirmation.html
                localStorage.setItem("confirmation", JSON.stringify(confirmation));
                window.location.href = "confirmation.html";
            };
        };

        //Envoi de la requète avec la méthode POST        
        request.open("post", "http://localhost:3000/api/cameras/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(achat);

        //Suppression du local storage après la confirmation de commande
        localStorage.clear();
    }
})



