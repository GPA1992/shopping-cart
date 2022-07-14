const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
const cartItems = document.querySelector('.cart__items');
localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it(`Se ao executar a função saveCartItems com o argumento '<ol><li>Item</li></ol>'(cartItems), o metodo localStorage.setItem é chamado`, () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Se ao executar a função saveCartItems com o argumento <ol><li>Item</li></ol>, o metodo localStorage.setItem é chamado com o parametro cartItems', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
