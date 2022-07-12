const fetchProducts = async (product) => {
  try {
    if (!product) { 
      throw new Error('You must provide an url');
    }
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const request = await fetch(url);
    const result = await request.json();
    return result;
} catch (error) {
   return error;
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// Algo deu errado :(
// TypeError: Only absolute URLs are supported