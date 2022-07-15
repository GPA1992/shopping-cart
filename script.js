const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const clearButton = document.querySelector('.empty-cart');
const sectionItems = document.querySelector('.items');

const arrPrice = [];
const priceToRemove = [];
const sum = (arr) => Math.round(arr
  .reduce((accumulator, current) => accumulator + current, 0) * 100) / 100;

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const getStorage = () => {
  const storage = getSavedCartItems();
  cartItems.innerHTML = storage;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (e) => e.target.remove(); 

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', () => {
    localStorage.clear();
    saveCartItems(cartItems.innerHTML);
    priceToRemove.push(salePrice);  
    const subtraction = sum(arrPrice) - sum(priceToRemove);
    totalPrice.innerText = Math.round(subtraction * 100) / 100;
  });
  return li;
};

const addFetchProduct = async () => {
  const pc = await fetchProducts('computador');
  document.querySelector('.loading').remove(); 
  pc.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    sectionItems.appendChild(createProductItemElement({ sku, name, image }));
  });
};

const addToCart = () => {
  const botao = document.querySelectorAll('.item__add');
  botao.forEach((i) => {
     i.addEventListener('click', async (e) => {
       const { id: sku, title: name, price: salePrice } = await fetchItem(getSkuFromProductItem(e
        .target.parentNode));
        cartItems.appendChild(createCartItemElement({ sku, name, salePrice })); 
        localStorage.clear();
        saveCartItems(cartItems.innerHTML);
        arrPrice.push(salePrice);
        totalPrice.innerText = sum(arrPrice);
     });
   });
};  

const removeItem = () => {
  const cartItem = document.querySelectorAll('.cart__item');
  cartItem.forEach((i) => {
    i.addEventListener('click', cartItemClickListener);
    i.addEventListener('click', () => {
      localStorage.clear();
      saveCartItems(cartItems.innerHTML);
    });
  });
};
const clearCartItem = () => {
  clearButton.addEventListener('click', () => {
    cartItems.innerHTML = '';
    totalPrice.innerText = '';
  });
};

window.onload = async () => {  
  await addFetchProduct();
  addToCart();
  getStorage();
  removeItem();
  clearCartItem();
};
