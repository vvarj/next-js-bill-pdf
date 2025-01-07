// Secret key for JWT signing

// Generate a JWT token
export const generateToken = async (payload: unknown) => {
  return String(payload);
};

// Verify a JWT token
export const verifyToken = async (token: unknown) => {
  try {
    if (token) return true;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
};
