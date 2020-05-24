
window.onload = function(){         
    
    //création du panier en récupérant les donnés du localStorage
    const cartBox = document.querySelector('.cartBox');             
    
    const cardBoxTable = cartBox.querySelector('table');
        let tableData = '';
        tableData += `<thead><tr class = "table-title"><th>Référence</th><th>Produit</th><th>Quantités</th><th>Prix Unitaire</th></tr></thead>`;
    
        if(JSON.parse(localStorage.getItem('items'))[0] == null){
            tableData += `<tr class= "table-content"><td colspan="5">Pas de produits dans le panier !</td></tr>`
        }else{
            JSON.parse(localStorage.getItem('items')).map(data=>{
                tableData += `<tr class= "table-content"><th>${data.id}</th><th>${data.name}</th><th>${data.no}</th><th>${data.price}</th><th class="suppr"><a href="#" onclick=Delete(this);>Supprimer</a></th></tr>`;
            });
        };
           
            //récupération des produits dans le local storage
            monPanier = [];
            monPanier = JSON.parse(localStorage.getItem('items'));
    
            //calcul du prix total du panier
            let Total = 0;
    
            for (i=0; i<monPanier.length; i++) {
                Total += monPanier[i].price*monPanier[i].no            
            }

            console.log(monPanier);
            console.log(Total);
    
            //ajout du total dans le tableau
             
            tableData += `<tfoot><tr class="total"><th>Prix Total</th><th></th><th></th><th>${Total} € </thr></tr></tfoot>`
            cardBoxTable.innerHTML = tableData;   
            
            //indication du nombre de produits dans le panier
            const iconShoppingP = document.querySelector('.iconShopping p');
            let no = 0;
            JSON.parse(localStorage.getItem('items')).map(data=>{
            no = no + data.no
            });
            iconShoppingP.innerHTML = no;            
}   
    
        
//suppresion d'un produit du panier
    function Delete(e){
        let items = [];
        JSON.parse(localStorage.getItem('items')).map(data=>{
            if(data.id != e.parentElement.parentElement.children[0].textContent){                
                items.push(data);    
            }
        });
        localStorage.setItem('items',JSON.stringify(items));
        window.location.reload();
    };



// Récupération des informations du formulaire pour la requête POST au serveur
const form = document.getElementById("form");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const addresse = document.getElementById("adresse");
const ville = document.getElementById("ville");
const email = document.getElementById("email");


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
    const products = [] 
    for (let i = 0; i < monPanier.length; i++) {
      products.push(monPanier[i].id.trim())
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
        localStorage.setItem("confirmation",JSON.stringify(confirmation));
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

