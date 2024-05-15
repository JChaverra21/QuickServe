export const ValidarToken = async (token) => {
  const response = await fetch("http://127.0.0.1:5000/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  return response;
};
