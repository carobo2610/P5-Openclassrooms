//récuperer l'ID de la commande orderId pour l'insérer dans le champs "orderId"
let orderId = new URLSearchParams(window.location.search).get("orderid");
let idOrder = document.getElementById('orderId');
idOrder.innerHTML = orderId;

//Vider le localstorage les produits du panier "présents dansla clé:products du Ls"
localStorage.removeItem("products");