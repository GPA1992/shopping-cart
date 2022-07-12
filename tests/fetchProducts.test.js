require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
    it('Se é uma função', () => {
      expect(typeof (fetchProducts)).toBe('function');
    })
    it('Se a função fetchProducts for chamada com o argumento computador deve ser verificado se fetch foi chamda', () => {
      expect.assertions(1);
      fetchProducts('computador');
      expect(fetch).toHaveBeenCalled();
    })
    it('Se a função fetchProducts for chamda com o argumento computador, a função acessa o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
      expect.assertions(1);
      const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
      await fetchProducts('computador')
      expect(fetch).toHaveBeenCalledWith(endpoint);
    })
    it('Se a função fetchProducts retorna um objeto igual ao computadorSearch', async () => {
      expect(await fetchProducts('computador')).toEqual(computadorSearch);
    })
    it('se a função fetchProducts for chamada sem parametros ela deve retornar a frase  You must provide an url', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
    })
});
