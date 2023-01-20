//Récupération de l'ID du produit dans l'URL
let product_id = new URLSearchParams(window.location.search).get("id");

//Récupération des infos du produit depuis l'API grâce à son ID
fetch('http://localhost:3000/api/products/' + product_id)
.then ((response) => {
    return (response.json())
}) .then ((product) => {
    displayProduct(product)
}) 

//créer les variables pour les sélecteurs à insérer avec les infos produits dans la page 
let product_image = document.querySelector('.item__img');
let product_name = document.getElementById('title');
let product_price = document.getElementById('price');
let product_description = document.getElementById('description');
let product_color = document.getElementById('colors');
let product_quantity = document.getElementById('quantity');
let product_addToCart = document.getElementById('addToCart');

/**
 * Insérer les infos des produits de façon automatique
 * @function displayProduct
 * @param {object} product Object get from the API.
 */
function displayProduct(product){
    product_image.innerHTML = `<img src="${product.imageUrl}"alt="${product.altTxt}">`;
    product_name.innerHTML = product.name;
    product_price.innerHTML = product.price;
    product_description.innerHTML = product.description;
    //ajouter une boucle pour le choix de la couleur du "product"
        for (let i = 0; i < product.colors.length; i++){
                product_color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
            }
} 

product_addToCart.addEventListener("click",() => {     
    const quantity = parseInt(product_quantity.value); //transforme string en nombre entier
    const color = product_color.value;
    if (color === ""){
        alert("Veuillez saisir une couleur")
    } 
    else if (quantity < 1 || quantity > 100){
        alert("Veuillez renseigner une quantité entre 1 et 100")
    }
    else {
        alert("Article(s) ajouté(s) au panier")
        const kanap = {        //objet "kanap" avec valeurs à envoyer dans localStorage
            id : product_id,
            color, 
            quantity
        }
        addLstor(kanap);
    }
})

/**
 * Ajout des infos de l'objet "kanap" dans le localstorage
 * @function addLstor
 * @param {object} kanap Object with the keys and values of the product to add to the LS.
 * @param {Array} cartLs List of products in the Localstorage.
 */
function addLstor(kanap) {
let cartLs = JSON.parse(localStorage.getItem('products')) || [];    //cartLs = null = tableau
    const foundKanap = cartLs.find((element) => kanap.id == element.id && kanap.color == element.color);
        if (foundKanap) {                   
        foundKanap.quantity = foundKanap.quantity + kanap.quantity //foundKanap.quantity=précédente qty//kanap.quantity=nouvel élément
            } else {
                cartLs.push(kanap);         //push de l'object "kanap" dans le array "cartLs"
            }
            localStorage.setItem('products', JSON.stringify(cartLs)); //stockage des produits dans le localstorage
}