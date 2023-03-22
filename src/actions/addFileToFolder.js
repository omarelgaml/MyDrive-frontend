import axios from '../axios';

const addFileToFolder = async (body) => {
  try {
    const { files, folderId } = body;
    const formData = new FormData();
    const filesToUpload = files;
    for (let i = 0; i < filesToUpload.length; i++) {
      formData.append('uploadImages', filesToUpload[i]);
    }
    formData.append('folderId', folderId);
    const response = await axios.post('/folders/upload-to-folder', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
export default addFileToFolder;
