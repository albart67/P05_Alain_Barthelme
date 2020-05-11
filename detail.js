const urlAPI = "http://localhost:3000/api/cameras"

console.log (document.location);

const loc = document.location;

console.log(window.location.search)

console.log(window.location.hash)

const urlID = window.location.search;
const urlParams = new URLSearchParams(urlID);

console.log(urlParams)
const idByArticle = urlParams.get('id');
console.log(idByArticle)

const urlDetail = urlAPI + "/"+ idByArticle;

console.log(urlDetail)


const addProduct = document.getElementById('addProd'); 

fetch(urlDetail)
    .then(function (response) {
        if(response.ok){
            response.json()
                .then(function (data) {
                    {  
                        addProduct.innerHTML+=`
                        <div class="article-detail-container">
                            <div class="item-pic">  
                                <img class="cards_item" src="${data.imageUrl}" alt="Appareil photo vintage ${data.name}" width="600">
                            </div>
                            <div class="item-body">
                                <div class="item-body-info">
                                    <h3 class="item-body-title">${data.name}</h3>
                                    <p class="item-body-lenses"><strong>Lentilles :</strong> ${data.lenses}</p>
                                    <p class="item-body-description"><strong>Descriptif:</strong> ${data.description}</p>
                                    <p class="item-body-price"><strong>Prix :</strong> ${data.price / 100} €</p>
                                    <p class="item-body-id"><strong>Reference :</strong> ${data._id}</p>
                                </div>
                                    
                            <form class="card_form" action="panier.html?id=${data._id}">
                                <div class= choose-lense>
                                    <label class="card__orm-label" for="lenses" id=lensesTest ><strong>Choisir une lentilles : </strong> </label>
                                    <select id="lenses" class="card_form_select js-lensesSelectAllOption" aria-label="Sélectionner la lentille de votre choix"></select>                    
                                </div>
                                <button class="btn" type="submit" aria-label="Valider et accéder au panier">Valider</button>
                            </form>            
                        </div>` 

      const select = document.getElementById("lenses")
      for (let i = 0; i < data.lenses.length; i++) {
            select.innerHTML +=
            `<option class="card__form__select--option" value="${data.lenses[i]}">${data.lenses[i]}</option>`             
            }          
          }
        }
      )
    }else {
        console.error('server response : ' + response.status);
    }        
  }
);

