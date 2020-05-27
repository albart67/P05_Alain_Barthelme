

window.onload = function () {

    const urlAPI = "http://localhost:3000/api/cameras"


    //Requete serveur pour l'affichage de l'ensemble des produits de type "cameras"

    //On accède à l'element qui va recevoir le détail de l'article selectionné
    const allArticles = document.getElementById('allArticlesList');

    fetch(urlAPI).then(response => {
        if (response.ok) {
            response.json().then(function (data) {
                for (let i = 0; i < data.length; i++) {
                    allArticles.innerHTML += ` 
                            <div class=articles-lists-item>
                                <div class="item-pic">  
                                    <img class="item-pic-menu" src="${data[i].imageUrl}" alt="Appareil photo vintage ${data[i].name}">
                                </div>                    
                                <div class="item-body">
                                    <h3 class="item-body-title">${data[i].name}</h3>
                                    <p class="item-body-lenses"><strong>Lentilles :</strong> ${data[i].lenses}</p>
                                    <p class="item-body-price"><strong>Prix :</strong> ${data[i].price / 100} €</p>
                                    <botton class="item-choise" id="bouton" >
                                    <a class="btn btn-show-detail" id="clic" href="produit.html?id=${data[i]._id}">Voir le détail du produit</a>
                                    </botton>
                                </div>
                            </div>`
                }
            })
        } else {
            console.error('server response : ' + response.status);
        }
    })
        .catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });


    //indication du nombre de produits dans le panier
    const iconShoppingP = document.querySelector('.iconShopping p');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).filter(data => {
        no = no + data.no
    });
    iconShoppingP.innerHTML = no;
}
