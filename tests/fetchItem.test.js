require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Se é uma função', () => {
    expect(typeof (fetchItem)).toBe('function');
  })
  it('Verificar se fetch foi chamda ao executar a função com o parametro MLB1615760527', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('Se ao chamar fetchItem com o argumento MLB1615760527 a função fetch acessa o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    expect.assertions(1);
      const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
      await fetchItem('MLB1615760527')
      expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  it('Se a função fetchItem retorna um objeto igual ao item', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })
  it('se a função fetchItem for chamada sem parametros ela deve retornar a frase  You must provide an url', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
    })
});
