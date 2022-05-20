import axios from "axios";

export const getAllRecipe = async () => {
  const response = await axios.get(`/recipes`);
  return response.data;
};
export const getRecipe = async (id) => {
  const response = await axios.get(`/recipes/${id}`);
  return response.data;
};
export const getSpecial = async () => {
  const response = await axios.get(`/specials/`);
  return response.data;
};