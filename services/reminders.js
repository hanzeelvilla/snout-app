import axios from "axios";

const baseUrl = "https://8qq7qc3p-3000.usw3.devtunnels.ms/api/reminders";

const getReminders = async (token) => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createReminder = async (newReminder, token) => {
  const response = await axios.post(baseUrl, newReminder, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateReminder = async (id, updatedReminder, token) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedReminder, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteReminder = async (id, token) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default { getReminders, createReminder, updateReminder, deleteReminder };
