/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFiles } from '../redux/thunks/userThunks';
import { StyledButton } from './StyledComponents';
function Uploader(props) {
  const { selectedFolderId, updateView, user } = props;
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    fileInputRef.current.click();
  };
  const onUpload = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      uploadFiles({
        files: e.target.files,
        totalStorage: user.totalStorage,
        usedStorage: user.usedStorage,
        folderId: selectedFolderId,
        userId: user._id
      })
    );
    if (selectedFolderId) {
      // in case of uploading file to folder in the tail of the view
      const { folder } = response.payload;

      updateView(folder);
    }

    fileInputRef.current.value = null;
  };
  return (
    <form>
      <StyledButton onClick={onButtonClick}>Upload File</StyledButton>
      <input
        type="file"
        id="file"
        name="uploadImages"
        multiple
        onChange={onUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    </form>
  );
}
export default Uploader;
