



window.onload = function () {

    //création du panier en récupérant les donnés du localStorage
    const cartBox = document.querySelector('.cartBox');

    const cardBoxTable = cartBox.querySelector('table');

    const localItems = JSON.parse(localStorage.getItem("items"));

    let tableData = '';
    tableData += `<thead><tr class = "table-title"><th>Référence</th><th>Produit</th><th>Quantités</th><th>Prix Unitaire</th></tr></thead>`;

    if (localItems[0] == null) {
        tableData += `<tr class= "table-content"><td colspan="5">Pas de produits dans le panier !</td></tr>`
    } else {
        localItems.map(data => {
            tableData += `<tr class= "table-content"><th>${data.id}</th><th>${data.name}</th><th>${data.no}</th><th>${data.price}</th><th class="suppr"><a href="#" onclick=Delete(this);>Supprimer</a></th></tr>`;
        });
    };

    //récupération des produits dans le local storage
    //monPanier = [];
    //monPanier = JSON.parse(localStorage.getItem('items'));

    //calcul du prix total du panier
    let Total = 0;

    for (i = 0; i < localItems.length; i++) {
        Total += localItems[i].price * localItems[i].no
    }

    //console.log(monPanier);
    console.log(Total);

    //ajout du total dans le tableau

    tableData += `<tfoot><tr class="total"><th>Prix Total</th><th></th><th></th><th>${Total} € </thr></tr></tfoot>`
    cardBoxTable.innerHTML = tableData;

    //indication du nombre de produits dans le panier
    const iconShoppingP = document.querySelector('.iconShopping p');
    let no = 0;
    localItems.filter(data => {
        no = no + data.no;
    });
    iconShoppingP.innerHTML = no;
}


//suppresion d'un produit du panier
function Delete(e) {
    let items = [];
    JSON.parse(localStorage.getItem('items')).filter(data => {
        if (data.id != e.parentElement.parentElement.children[0].textContent) {
            items.push(data);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
    window.location.reload();
};



// Récupération des informations du formulaire pour la requête POST au serveur
const form = document.getElementById("form");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const addresse = document.getElementById("adresse");
const ville = document.getElementById("ville");
const email = document.getElementById("email");

const wrongInput = document.getElementsByClassName('wrongInput');
const wrongEmail = document.getElementById('wrongEmail');




// Contrôle du nom en fin de saisie
nom.addEventListener("blur", function (e) {
    var validiteNom = "";

    var regexName = /^[a-zA-Zéèïî][a-zéèêàçîï]+([-'\s][a-zA-Zéèïî][a-zéèêàçîï]+)?/;
    if (!regexName.test(e.target.value)) {
        validiteNom = "Nom invalide";
    }
    document.getElementById("wrongName").textContent = validiteNom;

});

// Contrôle du prénom en fin de saisie
prenom.addEventListener("blur", function (e) {
    var validitePrenom = "";

    var regexForname = /^[a-zA-Zéèïî][a-zéèêàçîï]+([-'\s][a-zA-Zéèïî][a-zéèêàçîï]+)?/;
    if (!regexForname.test(e.target.value)) {
        validitePrenom = "Prenom invalide";
    }
    document.getElementById("wrongForname").textContent = validitePrenom;

});

// Contrôle du courriel en fin de saisie
email.addEventListener("blur", function (e) {
    var validiteCourriel = "";

    var regexCourriel = /.+@.+\..+/;
    if (!regexCourriel.test(e.target.value)) {
        validiteCourriel = "email invalide";
    }
    document.getElementById("wrongEmail").textContent = validiteCourriel;

});

// Contrôle de l'adress en fin de saisie
adresse.addEventListener("blur", function (e) {
    var validiteAdresse = "";

    var regexAdress = /[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*/;
    if (!regexAdress.test(e.target.value)) {
        validiteAdresse = "Adresse invalide";
    }
    document.getElementById("wrongAdress").textContent = validiteAdresse;
});

// Contrôle de la ville  en fin de saisie
ville.addEventListener("blur", function (e) {
    var validiteVille = "";

    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexVille = /^[a-zA-Zéèïî][a-zéèêàçîï]+([-'\s][a-zA-Zéèïî][a-zéèêàçîï]+)?/;
    if (!regexVille.test(e.target.value)) {
        validiteVille = "Ville invalide";
    }
    document.getElementById("wrongCity").textContent = validiteVille;
});

var regexVille = /^[a-zA-Zéèïî][a-zéèêàçîï]+([-'\s][a-zA-Zéèïî][a-zéèêàçîï]+)?/;
console.log(regexVille.test(ville))


// Requèté POST avec les éléments du panier + coordonnés du formulaire  :
form.addEventListener("submit", function (event) {
    event.preventDefault()
    ///Creation d'une variable contact contenant les informations de contact saisie par l'utilisateur


    const contact = {
        lastName: nom.value,
        firstName: prenom.value,
        address: addresse.value,
        city: ville.value,
        email: email.value
    }

    //console.log(contact)

    // Création d'une variables "products" qui contient les informations du panier
    monPanier = [];
    monPanier = JSON.parse(localStorage.getItem('items'));
    const products = [];
    for (let i = 0; i < monPanier.length; i++) {
        products.push(monPanier[i].id.trim());
    }

    //console.log(products)    

    let data = { contact, products } // Création d'une variable "data" qui contient les 2 éléments à transmettre au serveur
    //console.log(data)   

    let achat = JSON.stringify(data);
    console.log(achat);


    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            let confirmation = JSON.parse(this.responseText);
            console.log(confirmation);
            localStorage.setItem("confirmation", JSON.stringify(confirmation));
            window.location.href = "confirmation.html";
        };
    };

    request.open("post", "http://localhost:3000/api/cameras/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(achat);

    localStorage.clear();
})




/*

//envoi des éléments au serveur
//const urlPost = 'http://localhost:3000/api/cameras/order'


    fetch('http://localhost:3000/api/cameras/order',{
        method: 'POST',
        headers:{'Content-type':'application/JSON'},
        body: JSON.stringify(data)
    }).then((response) =>response.json())
    .then((data) => console.log(data))
    .catch((error)=> console.log(error))
})

*/

