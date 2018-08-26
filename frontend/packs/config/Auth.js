import axios from 'axios';

const isAuthenticated = async function() {
  try {
    const result = await axios.get(`${window.location.origin}/users/sign_out`);

    if (result && result.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
};

export { isAuthenticated };
