// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
// export const searchGoogleBooks = (query) => {
//     return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
//   };

export const searchCocktails = (query) => {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
  };