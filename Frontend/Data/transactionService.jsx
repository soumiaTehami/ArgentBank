const BASE_URL = "http://localhost:3001/api/v1";

const getTransactions = async (token) => {
  const response = await fetch(`${BASE_URL}/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch transactions");
  return response.json();
};

const getTransactionById = async (id, token) => {
  const response = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch transaction details");
  return response.json();
};

const createTransaction = async (transaction, token) => {
  const response = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transaction),
  });
  if (!response.ok) throw new Error("Failed to create transaction");
  return response.json();
};

const updateTransaction = async (id, transaction, token) => {
  const response = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transaction),
  });
  if (!response.ok) throw new Error("Failed to update transaction");
  return response.json();
};

const deleteTransaction = async (id, token) => {
  const response = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete transaction");
  return response.json();
};

export {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
