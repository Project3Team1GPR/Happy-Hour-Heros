export const getSavedCocktailIds = () => {
    const savedCocktailIds = localStorage.getItem('saved_cocktails')
      ? JSON.parse(localStorage.getItem('cocktails'))
      : [];
  
    return savedCocktailIds;
  };
  
  export const saveCocktailIds = (cocktailIdArr) => {
    if (cocktailIdArr.length) {
      localStorage.setItem('saved_cocktails', JSON.stringify(cocktailIdArr));
    } else {
      localStorage.removeItem('saved_cocktails');
    }
  };
  
  export const removeCocktailId = (_id) => {
    const savedCocktailIds = localStorage.getItem('saved_cocktails')
      ? JSON.parse(localStorage.getItem('saved_cocktails'))
      : null;
  
    if (!savedCocktailIds) {
      return false;
    }
  
    const updatedSavedCocktailsIds = savedCocktailIds?.filter((savedCocktailId) => savedCocktailId !== _id);
    localStorage.setItem('saved_cocktails', JSON.stringify(updatedSavedCocktailsIds));
  
    return true;
  };