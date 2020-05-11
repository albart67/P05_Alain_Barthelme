
/*fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.catch(error => console.log(erreur))
.then(products => console.log(products))
*/

function Productlist() {

const allArticles = document.getElementById('allArticlesList'); 

fetch('http://localhost:3000/api/cameras')
    .then(response => {
        if(response.ok){        
            response.json()
                .then(function (data) {
                    for (let i = 0; i<data.length; i++) {  
                        allArticles.innerHTML+=` 
                    <div class=articles-lists-item>
                        <div class="item-pic">  
                            <img class="cards__item__thumb--img" src="${data[i].imageUrl}" alt="Appareil photo vintage ${data[i].name}" height="300" width="450">
                        </div>                    
                        <div class="item-body">
                            <h3 class="item-body-title">${data[i].name}</h3>
                            <p class="item-body-lenses"><strong>Lentilles :</strong> ${data[i].lenses}</p>
                            <p class="item-body-price"><strong>Prix :</strong> ${data[i].price / 100} €</p>
                            <botton class="item-choise" id="bouton" >
                            <a class="btn btn-show-detail" id="clic" href="produit.html?id=${data[i]._id}">Sélectionner</a>
                            </botton>
                        </div>
                    </div>`                              
                    }})                      
        }else {
        console.error('server response : ' + response.status);
        }                
    })
};
 
                    
                    
                    
  Productlist();  




  const getTodosAsync = async function () {
    try {
        const response = await fetch('http://localhost:4652/');
        if (response.ok) {
            const jsonData = await response.json();
            console.log(jsonData);
        } else {
            console.error('server response : ' + response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

getTodosAsync();