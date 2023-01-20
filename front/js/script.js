//Récupération des produits depuis l'API
fetch('http://localhost:3000/api/products')
.then ((response) => {         //appel fonction then pour récupérer résultat requète
    return (response.json())   //récupère requète au format json
}) .then ((products) => {      //résultat json = promise retournée et récupère valeur "products"
  displayProducts(products)       
}) 

/**
 * Affichage des données des produits
 * @function displayProducts
 * @param {Array} products List of products.
 */
function displayProducts (products){
  for(let i = 0; i < products.length; i++){
    document.getElementById('items').innerHTML += 
    `<a href="./product.html?id=${products[i]._id}">
    <article>
      <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
      <h3 class="productName"> ${products[i].name}</h3>
      <p class="productDescription" >${products[i].description} </p>
    </article>
    </a>`
  }
}
