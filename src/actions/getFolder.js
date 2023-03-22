import axios from '../axios';
const getFolder = async (body) => {
  try {
    const response = await axios.post('/folders/get-by-id', body);
    return response;
  } catch (err) {
    return err.response;
  }
};
export default getFolder;
