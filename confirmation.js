

//Element affichant la confirmation de commande
const orderConfirm = document.getElementById('orderConfirm')

//Récupération de la réponse de la requète POST dans le localStorage et mise au format JSON
let respondeOrder = JSON.parse(localStorage.getItem('confirmation'))

//console.log(respondeOrder)


//Ajout des données "firstName" et "orderId" dans le message de confirmation
orderConfirm.innerHTML += `<h1>Votre Commande</h1><p>Merci '${respondeOrder.contact.firstName}' pour votre commande !</p><p>Votre référence de commande est <strong>'${respondeOrder.orderId}'</strong></p>`



const resetCart = document.getElementById('resetCart');

//Bouton de retour au catalogue et initialisation de localStorage
resetCart.addEventListener('click', function(){
    localStorage.clear() 
})



