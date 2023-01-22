const calculateExpirationTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
};

// retrieves the stored token and re-calculates the expiration time..
export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const storedUserType = localStorage.getItem("userType");

  const remainingTime = calculateExpirationTime(storedExpirationTime);

  if (remainingTime <= 6000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userType: storedUserType,
  };
};

export default calculateExpirationTime;
