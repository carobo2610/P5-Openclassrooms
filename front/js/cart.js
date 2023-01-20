//récupérer les produits contenu dans le localstorage
//cartLs = produit(s) dans le Locastorage que l'utilisateur à sélectionné(s)
let cartLs = JSON.parse(localStorage.getItem('products'))
if (cartLs === null) {
  cartLs = [];
}
fetchProductFromId()

/**
 * Si produits dans le localstorage, récuperer les infos des produits concernés depuis l'API
 * @function fetchProductFromId
 * @param {array} cartLs Product in the Localstorage.
 * @param {object} product Product get from the API. 
 */
function fetchProductFromId(){
    for (let i = 0; i < cartLs.length; i++ ){
        fetch('http://localhost:3000/api/products/'+ cartLs[i].id)
        .then ((response) => {
            return (response.json())
        }) .then ((product) => {
          //récup couleur et quantité du LS 
          product.color = cartLs[i].color; //récupere couleur du produit du LS
          product.quantity = cartLs[i].quantity;
          displayTotalPriceInCart(cartLs[i].quantity, product.price); //appel de la fonction calcule prix total du panier
          displayProductCart(product, i);    //appel de la fonction d'affichage des produits dans le panier
        }) 
    }
}

/**
 * Affichage des infos des produits dans le HTML 
 * @function displayProductCart
 * @param {object} product Product get from the API.
 */
function displayProductCart (product, i) {
    document.getElementById("cart__items").innerHTML += `
      <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src=${product.imageUrl} alt=${product.altTxt}>
         </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
              <p>${product.color}</p>
              <p>${product.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" onchange="changeQuantityInput(this, ${i})" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" onclick="listenDeleteItem('${product._id}','${product.color}')" >Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
}

/**
 * Changements de quantité effectués dans le panier
 * @function changeQuantityInput
 * @param {Array} cartLs List of products in the Localstorage.
 */
function changeQuantityInput(element, i){ 
  if(element.value > 100){               //si la quantité est > à 100 
    element.value = 100;                 //objet qui à envoyé l'évènement est ramené à 100
    cartLs[i].quantity = 100;            //la quantité dans le localStorage est ramenée à 100
    localStorage.setItem("products", JSON.stringify(cartLs)); //envoi du produit modifié dans le LS
  } else if(element.value < 1){          //si la quantité est inférieure à 1 
      element.value = 1;                 //objet qui à envoyé l'évènement est ramené à 1
      cartLs[i].quantity = 1;            //la quantité dans le localStorage est ramenée à 1
      localStorage.setItem("products", JSON.stringify(cartLs));
    } else {                                    
      cartLs[i].quantity = parseInt(element.value);  //envoi de nombre entier dans le Localstorage
      localStorage.setItem("products", JSON.stringify(cartLs));
      }
     location.reload();        
};
 
/**
 * Fonction pour supprimer un ou plusieurs produit(s) du panier
 * @function listenDeleteItem
 * @param {Array} cartLs List of products in the Localstorage.
 */
function listenDeleteItem(data_id, data_color){
  //Avec "filter" on supprime tout ce qu'il y autour de l'élément cliqué 
  //Il faut donc inverser avec ! pour conserver les autres produits et supprimer celui qui a été cliqué  
    cartLs = cartLs.filter( product => 
    (product.id !== data_id && product.color !== data_color) ||(product.id === data_id && product.color !== data_color)); 
    //envoi dans le locastorage
    localStorage.setItem("products", JSON.stringify(cartLs));
    //alerte utilisateur et rechargement de la page automatiquement 
      alert("Le produit a bien été supprimé du panier");
      location.reload();       
};
displayTotalQuantityInCart()

 /**
 * Affichage du montant total du panier
 * @function displayTotalPriceInCart
 * @param {number} quantity Quantity of products in the cart.
 * @param {number} price Price of the product in the cart.
 */
let totalPrice = 0;                                 //initialisation du total à 0 quand aucun produit n'est dans le panier
function displayTotalPriceInCart(quantity, price) { //affiche le prix et la quantité à chaque retour d'API
  totalPrice = quantity * price + totalPrice
  document.getElementById("totalPrice").innerHTML = totalPrice;
}

/**
 * Affichage de la quantité totale de produits présents du panier
 * @function displayTotalQuantityInCart
 * @param {number} quantity Quantity of products in the cart.
 */
function displayTotalQuantityInCart() {
  let totalQuantityInCart = []; //variable pour récupérer la quantité de produits du panier depuis Ls
    for (i = 0; i < cartLs.length; i++){
      let quantityProductInCart = cartLs[i].quantity;
      //mettre le prix du produit présent dans le Ls dans le tableau "totalPriceInCart"
      totalQuantityInCart.push(quantityProductInCart); //=tableau avec tous les prix des produits du panier dans le Ls
    }
    //additionner les prix présents dans le tableau "totalPriceInCart"
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const totalquantity = totalQuantityInCart.reduce(reducer,0) //0 = valeur initiale si panier vide (enelver retour erreur)
      document.getElementById("totalQuantity").innerHTML = totalquantity;
  }

//.................................formulaire .....................................//
//Créer variables avec les infos du formulaire à insérer dans HTML
let first_name = document.getElementById('firstName'); 
let last_name = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

//Variables pour déclarer les erreurs des champs de formulaire et leur style "rouge"
let firstNameError = document.getElementById('firstNameErrorMsg'); 
  firstNameError.style.color = 'red';
let lastNameError = document.getElementById('lastNameErrorMsg'); 
  lastNameError.style.color = 'red';
let addressError = document.getElementById('addressErrorMsg'); 
  addressError.style.color = 'red';
let cityError = document.getElementById('cityErrorMsg'); 
  cityError.style.color = 'red';
let emailError = document.getElementById('emailErrorMsg'); 
  emailError.style.color = 'red';

//Création de l'objet pour l'envoi du formulaire dans le POST
let contact = {
  firstName: "",
  lastname:"",
  address: "",
  city:"",
  email:""
};

let btnOrder = document.querySelector('.cart__order__form');
    btnOrder.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const formValues = {
      firstName : first_name.value,
      lastName : last_name.value,
      address : address.value,
      city : city.value,
      email : email.value
    };
    toSend(formValues); 
  }); 

  //Ecoute de la saisie des champs: vérification à la sortie du champ
  first_name.addEventListener("focusout", () => {
    checkFirstName(first_name.value)
  })
  last_name.addEventListener("focusout", () => {
    checkLastName(last_name.value)
  })
  address.addEventListener("focusout", () => {
    checkAddress(address.value)
  })
  city.addEventListener("focusout", () => {
    checkCity(city.value)
  })
  email.addEventListener("focusout", () => {
    checkEmail(email.value)
  })

    /**
   * Effectuer le controle du champ "prénom"
   * @function checkFirstName
   * @param {string} firstName String for the value of firstName.
   * @returns {boolean}
   */
    function checkFirstName(firstNameValue){
          if(/^[a-zA-Z-'çéèêàâôù\s]{3,20}$/.test(firstNameValue)){
        firstNameError.innerHTML = "";
        return true;
      }else{
        firstNameError.innerHTML = " Saisir entre 3 et 20 caractères sans caractères spéciaux";
        return false;
      } 
    };

     /**
     * Effectuer le controle du champ "nom"
     * @function checkLastName
     * @param {string} lastName String for the value of lastName.
     * @returns {boolean}
     */
    function checkLastName(lastNameValue){  
        if(/^[a-zA-Z-'çéèêàâôù\s]{2,20}$/.test(lastNameValue)){
        lastNameError.innerHTML = "";
        return true;
      }else{
        lastNameError.innerHTML = " Saisir entre 2 et 20 caractères sans caractères spéciaux";
        return false;
      }
    };
    /**
     * Effectuer le controle du champ "adresse"
     * @function checkAddress
     * @param {string} address String for the value of address.
     * @returns {boolean}
     */
    function checkAddress(addressValue){
        if(/^[a-zA-Z0-9-'çéèêàâôù\s]{3,30}$/.test(addressValue)){
          addressError.innerHTML = "";
        return true;
      }else{
        addressError.innerHTML = " Veuillez saisir entre 3 et 30 caractères sans caractères spéciaux";
        return false;
      }
    };

     /**
     * Effectuer le controle du champ "ville"
     * @function checkCity
     * @param {string} city String for the value of city.
     * @returns {boolean}
     */
    function checkCity(cityValue){
        if(/^[a-zA-Z-'çéèêàâôù\s]{3,30}$/.test(cityValue)){
          cityError.innerHTML = "";
        return true;
      }else{
        cityError.innerHTML = " Veuillez saisir texte entre 3 et 30 caractères sans caractères spéciaux";
        return false;
      }
    };

     /**
     * Effectuer le controle du champ "email"
     * @function checkEmail
     * @param {string} email String for the value of email.
     * @returns {boolean}
     */
    function checkEmail(emailValue){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)){
          emailError.innerHTML = "";
        return true;
      }else{
        emailError.innerHTML = "Veuillez saisir une adresse mail valide. ex: john.doe@hotmail.fr";
        return false;
      }
    };

    /**
     * Récupération valeurs du formulaire et des produits du panier pour envoi serveur
     * @function toSend
     * @param {array} cartLs List of products in the Localstorage.
     * @param {array} products List of the products in the cart.
     */
    function toSend (formValues) {
      let productsInCart = JSON.parse(localStorage.getItem("products"));
      if(productsInCart === null || productsInCart.length === 0){
          alert('Pour commander, veuillez ajouter un article à votre panier')
      } else if (checkFirstName(formValues.firstName) && checkLastName(formValues.lastName) 
          && checkCity(formValues.city) && checkAddress(formValues.address) 
          && checkEmail(formValues.email)) {
          let products = [];          //contitution d'un object: tableau de produits
          for (let cartLs of productsInCart ) {
            products.push(cartLs.id);
          }
          fetch("http://localhost:3000/api/products/order",{
            method: "POST",
            headers: {
              "Content-type" : "application/json",
            },
            body: JSON.stringify({
              contact: formValues,        
              products: products,         
            }),                  
          })
            .then((response) => {
              return (response.json())
            })
            .then((orderData) => {  
              const orderId = orderData.orderId;
              if (orderId !=""){
            window.location.href = "confirmation.html?orderid=" + orderId;
              } else {
              alert("La commande n'a pas aboutie");
              }
            });
          }  
        }       