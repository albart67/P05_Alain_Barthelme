

const urlAPI = "http://localhost:3000/api/cameras"


//Recherche de l'ID du produit selectionné dans l'URL
const urlID = window.location.search;
const urlParams = new URLSearchParams(urlID);

const idByArticle = urlParams.get('id');

console.log(idByArticle)

//On isole l'URL de l'article selectionné dans une const urlDetail
const urlDetail = urlAPI + "/" + idByArticle;

//On accède à l'element qui va recevoir le détail de l'article selectionné
const addProduct = document.getElementById('addProd');

//Requete serveur pour importer les donnés de l'article
fetch(urlDetail).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            addProduct.innerHTML += `
                        <div class="article-detail-container">
                            <div class="item-pic">  
                                <img class="cards-item" src="${data.imageUrl}" alt="Appareil photo vintage ${data.name}">
                            </div>
                            <div class="item-body-detail">
                                <div class="item-body-info">
                                    <h3 id="item-body-title">${data.name}</h3>
                                    <p class="item-body-lenses"><strong>Lentilles :</strong> ${data.lenses}</p>
                                    <p id="item-body-description"><strong>Descriptif: </strong> ${data.description}</p>
                                    <p id="item-body-price"><strong>Prix en €:</strong> ${data.price / 100}</p>
                                    <p id="item-body-id"><strong>Reference: </strong>${data._id}</p>
                                </div>
                                    
                            <form class="card_form" action="panier.html?id=${data._id}">
                                <div class= choose-lense>
                                    <label class="card-form-label" for="lenses" id=lensesTest ><strong>Choisir une lentilles : </strong> </label>
                                    <select id="lenses" class="card-form-select" aria-label="Sélectionner la lentille de votre choix"></select>                    
                                </div>                               
                            </form>            
                        </div>`
            //selection de l'option lentille                 
            const select = document.getElementById("lenses")
            for (let i = 0; i < data.lenses.length; i++) {
                select.innerHTML +=
                    `<option class="card-form-select-option" value="${data.lenses[i]}">${data.lenses[i]}</option>`
            }
        })
    } else {
        console.error('server response : ' + response.status);
    }
})
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });


//Ajout de l'article dans le locaStorage à chaque clic sur "ajouter au panier"
window.onload = function () {

    const attToCartBtn = document.getElementsByClassName('choiseProduct');
    let items = [];
    for (let i = 0; i < attToCartBtn.length; i++) {
        attToCartBtn[i].addEventListener("click", function (e) {
            if (typeof (Storage) !== 'undefined') {
                //On crée un objet contenant le local storage 
                const localItems = JSON.parse(localStorage.getItem("items"));
                let item = {
                    id: document.getElementById("item-body-id").lastChild.textContent,
                    name: document.getElementById("item-body-title").textContent,
                    price: document.getElementById("item-body-price").lastChild.textContent,
                    no: 1
                };
                //Si le local storage est vide on envoi le premier ojbet article dans le local storage
                if (localItems === null) {
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                } else {
                    localItems.find(data => {
                        //Si l'objet localItems contient déja un article similaire, on augmente la quantité de l'article sselectionné de 1
                        if (item.id == data.id) {
                            item.no = data.no + 1;
                        } else {
                            //Si un article similaire n'est pas présent on charge le local storage dans l'objet items
                            items.push(data);
                        }
                    });
                    items.push(item); //on rajoute l'article selectionné dans l'objet items
                    localStorage.setItem('items', JSON.stringify(items)); //on recharge le local storage avec l'objet items stringifié
                    window.location.reload();
                }
            } else {
                alert('Le local storage ne fonctionne pas sur votre navigateur');
            }

        });


        //indication du nombre de produits dans le panier en entête
        const iconShoppingP = document.querySelector('.iconShopping p');

        let no = 0;
        JSON.parse(localStorage.getItem('items')).find(data => {
            no = no + data.no
        });
        iconShoppingP.innerHTML = no;
    }
}



