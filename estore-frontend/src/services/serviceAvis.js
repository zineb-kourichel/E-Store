export const getAvis = (produitId) => {
  const tous = JSON.parse(localStorage.getItem("avis")) || {};
  return tous[produitId] || [];
};

export const ajouterAvis = (produitId, avis) => {
  const tous = JSON.parse(localStorage.getItem("avis")) || {};
  if (!tous[produitId]) tous[produitId] = [];
  tous[produitId].push(avis);
  localStorage.setItem("avis", JSON.stringify(tous));
};