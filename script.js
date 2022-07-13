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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addFetchProduct = async () => {
  const sectionItems = document.querySelector('.items');
  const cartItems = document.querySelector('.cart__items');
  const pc = await fetchProducts('computador');
  pc.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    sectionItems.appendChild(createProductItemElement({ sku, name, image }));
  });
  };
 
const addToCart = () => {
  const botao = document.querySelectorAll('.item__add');
  const cartItem = document.querySelector('.cart__items');
  console.log(botao);
  botao.forEach((i) => {
     i.addEventListener('click', async (e) => {
       const { id: sku, title: name, price: salePrice } = await fetchItem(getSkuFromProductItem(e
        .target.parentNode));
        cartItem.appendChild(createCartItemElement({ sku, name, salePrice })); 
     });
   });
};  

window.onload = async () => {
  await addFetchProduct();
  addToCart();
 };
