import customFetch from "../../utils/axios";

export const addIncidentThunk = async (url, body, options) => {
  try {
    const resp = await customFetch.post(url, body, options); // Utiliser body pour envoyer { description }
    const data = resp.data;
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'incident:", error);
    throw error; // Laissez createAsyncThunk gérer l'erreur
  }
};
