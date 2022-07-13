const fetchItem = async (item) => {
  try {
    if (!item) { 
      throw new Error('You must provide an url');
    }
    const url = `https://api.mercadolibre.com/items/${item}`;
    const request = await fetch(url);
    const result = await request.json();
    return result;
} catch (error) {
   return error;
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
