import axios from '../axios';

const addFolderToFolder = async (body) => {
  try {
    const response = await axios.post('/folders/add-folder-to-folder', body);

    return response.data;
  } catch (err) {
    return err.response;
  }
};
export default addFolderToFolder;
