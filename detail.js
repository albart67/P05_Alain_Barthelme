

const urlAPI = "http://localhost:3000/api/cameras"


//Recherche de l'ID du produit selectionné dans l'URL
const urlID = window.location.search;
const urlParams = new URLSearchParams(urlID);

const idByArticle = urlParams.get('id');

//On isole l'URL de l'article selectionné dans une const urlDetail
const urlDetail = urlAPI + "/"+ idByArticle;

//On accède à l'element qui va recevoir le détail de l'article selectionné
const addProduct = document.getElementById('addProd'); 

//Requete serveur pour importer les donnés de l'article
fetch(urlDetail).then(function (response) {
        if(response.ok){
            response.json().then(function (data) {
                    addProduct.innerHTML+=`
                        <div class="article-detail-container">
                            <div class="item-pic">  
                                <img class="cards-item" src="${data.imageUrl}" alt="Appareil photo vintage ${data.name}" width="600">
                            </div>
                            <div class="item-body">
                                <div class="item-body-info">
                                    <h3 id="item-body-title">${data.name}</h3>
                                    <p class="item-body-lenses"><strong>Lentilles :</strong> ${data.lenses}</p>
                                    <p id="item-body-description"><strong>Descriptif:</strong> ${data.description}</p>
                                    <p id="item-body-price"><strong>Prix en €:</strong> ${data.price / 100}</p>
                                    <p id="item-body-id"><strong>Reference :</strong> ${data._id}</p>
                                </div>
                                    
                            <form class="card_form" action="panier.html?id=${data._id}">
                                <div class= choose-lense>
                                    <label class="card-form-label" for="lenses" id=lensesTest ><strong>Choisir une lentilles : </strong> </label>
                                    <select id="lenses" class="card-form-select" aria-label="Sélectionner la lentille de votre choix"></select>                    
                                </div>                               
                            </form>            
                        </div>` 
                                     
                    const select = document.getElementById("lenses")
                    for (let i = 0; i < data.lenses.length; i++) {
                            select.innerHTML +=
                            `<option class="card-form-select-option" value="${data.lenses[i]}">${data.lenses[i]}</option>`             
                            } 
                         })        
                    }else {
                    console.error('server response : ' + response.status);
                    } 
            })
            .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });


window.onload = function(){    
	      
    const attToCartBtn = document.getElementsByClassName('choiseProduct');
    let items = [];
    for(let i=0; i<attToCartBtn.length; i++){
        attToCartBtn[i].addEventListener("click",function(e){
            if(typeof(Storage) !== 'undefined'){
                let item = {
                        id: document.getElementById("item-body-id").lastChild.textContent,
                        name: document.getElementById("item-body-title").textContent,
                        price: document.getElementById("item-body-price").lastChild.textContent,
                        no:1
                };
                if(JSON.parse(localStorage.getItem('items')) === null){
                    items.push(item);
                    localStorage.setItem("items",JSON.stringify(items));
                    window.location.reload();
                }else{
                    const localItems = JSON.parse(localStorage.getItem("items"));
                    localItems.map(data=>{
                        if(item.id == data.id){
                            item.no = data.no + 1;
                        }else{
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem('items',JSON.stringify(items));
                    window.location.reload();
                }
            }else{
                alert('Le local storage ne fonctionne pas sur votre navigateur');
            }
        });

//indication du nombre de produits dans le panier
    const iconShopping = document.querySelector('.iconShopping');
    const iconShoppingP = document.querySelector('.iconShopping p');

    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(data=>{
    no = no + data.no
    });
    iconShoppingP.innerHTML = no;
    }
}






/*

console.log(urlParams)

console.log(idByArticle)
console.log(urlDetail)


console.log (document.location);

//const loc = document.location;

console.log(window.location.search)

console.log(window.location.hash)
*/


/*

const cardBoxTable = cartBox.querySelector('table');
	let tableData = '';
    tableData += '<tr><th>Référence</th><th>Produit</th><th>Quantités</th><th>Prix</th><th></th></tr>';
    if(JSON.parse(localStorage.getItem('items'))[0] === null){
		tableData += '<tr><td colspan="5">No items found</td></tr>'
    }else{
		JSON.parse(localStorage.getItem('items')).map(data=>{
			tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th><a href="#" onclick=Delete(this);>Suprimer</a></th></tr>';
		});
    };
    
    cardBoxTable.innerHTML = tableData;
*/



/*
const carts = document.getElementsByClassName('classbouton')
console.log(carts.length)
let items = [];
for (let i=0; i<carts.length; i++){
    carts[i].addEventListener("click", function(e){
        //console.log(document.getElementById("item-body-price").lastChild.textContent);
        if(typeof(Storage)!== 'undefined') {
            let item = {
                id: document.getElementById("item-body-id").lastChild.textContent,
                name: document.getElementById("item-body-title").textContent,
                price: document.getElementById("item-body-price").lastChild.textContent,
                no:1
            };
            if(JSON.parse(localStorage.getItem('items')) === null){
                items.push(item);
                localStorage.setItem("items", JSON.stringify(item));
            } else {
                const localItems = JSON.parse(localStorage.getItem("items"));
                console.log(localItems);
              localItems.map(data=>{
                console.log(data)
                    if(item.id == data.id){
                        item.no = item.no + 1;
                        console.log(item);
                    }else{console.log(false);
                    }
                }
            })
            
        }
    })
}
*/


/*
const cardBoxTable = cartBox.querySelector('table');
//console.log(cardBoxTable);
let tableData = '';
tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';
*/



/*


//adding cartbox data in table
const cardBoxTable = document.getElementById('table');
let tableData = '';
tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';
if(JSON.parse(localStorage.getItem('items'))[0] === null){
    tableData += '<tr><td colspan="5">No items found</td></tr>'
}else{
    JSON.parse(localStorage.getItem('items')).map(data=>{
        tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
    });
}
cardBoxTable.innerHTML = tableData;


/*

for (let i=0; i<carts.length; i++){
    cart[i].addEventListener('click', ()=>{
        cartNumbers
    } )
}

fir



function cartNumbers () {
    localStorage.setItem('cartNumbers',1);
}



var MonProduit = 'canon';

localStorage.setItem('appareil1', MonProduit);

var Namestor = document.getElementsByTagName('h3');

 //var cont = Namestor.textContent;

console.log(Namestor)

localStorage.setItem('Marque', Namestor);

/*
var btnTest = document.getElementById('essai');

btnTest.addEventListener('click', nombreclic()
)

function nombreclic() {
    let prodNumbers = localStorage.getItem('nbrclic');
    prodNumbers= parseInt(prodNumbers);
    console.log(typeof prodNumbers);

    if(!prodNumbers==0){
        localStorage.setItem('nbrclic', prodNumbers + 1);
    } else {
    localStorage.setItem('nbrclic', 1);
    }
}

localStorage.setItem('test1', MonProduit);
*/
/*
function clic() {
    compteurClics++;
    document.getElementById("compteurClics").textContent = compteurClics;
}

var compteurClics = 0;


document.getElementById("essai").addEventListener("click", clic);
localStorage.setItem('nbrclic', compteurClics);

document.getElementById("desactiver").addEventListener("click", function () {
    document.getElementById("clic").removeEventListener("click", clic);

       
});

/*
function clic() {
    compteurClics++;
    document.getElementById("essai").textContent = compteurClics;
}
*/
