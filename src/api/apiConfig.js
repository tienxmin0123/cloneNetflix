const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "fe61c428dcfa2973e5a2c76b9193c85e",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};
export default apiConfig;
