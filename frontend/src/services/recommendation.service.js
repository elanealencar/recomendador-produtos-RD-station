// getRecommendations.js

const RECCOMENDATION_TYPES = {
  SINGLE_PRODUCT: 'SingleProduct',
  MULTIPLE_PRODUCTS: 'MultipleProducts',
};

// Lógica para retornar os produtos recomendados

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products = [],
) => {
  if (!Array.isArray(products) || products.length === 0) {
    if (formData.selectedRecommendationType === RECCOMENDATION_TYPES.SINGLE_PRODUCT) {
      return null;
    }
    return [];
  }

  const selectedPreferences = normalizeToArray(formData.selectedPreferences);
  const selectedFeatures = normalizeToArray(formData.selectedFeatures);
  const recommendationType = 
    formData.selectedRecommendationType || RECCOMENDATION_TYPES.SINGLE_PRODUCT;

  const hasFilters = 
    selectedPreferences.length > 0 || selectedFeatures.length > 0;

  const scoreProducts = products
    .map((product) => {
      const score = calculateScore(product, selectedPreferences, selectedFeatures);

      // Se há filtros ativos: só entra quem tiver score > 0
      // Se não há filtros: todo mundo é considerado match
      const matches = hasFilters ? score > 0 : true;

      return { product, score , matches };
    })
    .filter((item) => item.matches);

  if (recommendationType === RECCOMENDATION_TYPES.SINGLE_PRODUCT) {
    return selectSingleProduct(scoreProducts);
  }

  // MultipleProducts: sempre retornamos uma lista
  return scoreProducts.map((item) => item.product);
};

/**
 * Calcula um "score" para cada produto baseado em:
 * - preferências que casam (peso 2)
 * - funcionalidades que casam (peso 1)
*/
function calculateScore(
  product,
  selectedPreferences,
  selectedFeatures
) {
  let score = 0;

  if (selectedPreferences.length > 0 && Array.isArray(product.preferences)) {
    const matchedPrefs = product.preferences.filter((pref) =>
      selectedPreferences.includes(pref)
    );
    score += matchedPrefs.length * 2; // peso 2 para preferências
  }

  if (selectedFeatures.length > 0 && Array.isArray(product.features)) {
    const matchedFeatures = product.features.filter((feat) =>
      selectedFeatures.includes(feat)
    );
    score += matchedFeatures.length * 1; // peso 1 para funcionalidades
  }
  
  return score;
}

/**
 * Escolhe um único produto:
 * - maior score
 * - em empate, devolve o ÚLTIMO produto com esse score
*/
function selectSingleProduct(scoreProducts) {
  if (!scoreProducts || scoreProducts.length === 0) return null;

  const selected = scoreProducts.reduce((currentSelected, current) => {
    if (!currentSelected) return current;
    if (current.score > currentSelected.score) {
      return current;
    }
    if (current.score === currentSelected.score) {
      return current; // em empate, escolhe o último
    }
    
    return currentSelected;
  }, null);

  return selected ? selected.product : null;
}

function normalizeToArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value];
}

export default { getRecommendations, RECCOMENDATION_TYPES };
