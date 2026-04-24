export const mockGoogleLogin = async (email, asRole = 'b2c') => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, role: asRole })
  });
  
  if (!response.ok) {
    throw new Error('Failed to login via Backend API');
  }
  
  return response.json();
};

export const fetchProductsBySegment = async (userRole) => {
  const response = await fetch(`/api/products/${userRole}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products from Backend API');
  }
  
  return response.json();
};

export const fetchPromotions = async () => {
  const response = await fetch('/api/promotions');
  if (!response.ok) {
    throw new Error('Failed to fetch promotions');
  }
  return response.json();
};
