/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { addFileToUser } from '../redux/thunks/userThunks';
import AddFileToFolder from '../actions/addFileToFolder';
import { StyledButton } from './StyledComponents';
function Uploader(props) {
  const { selectedFolderId, updateView, user, setLoading } = props;
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    fileInputRef.current.click();
  };
  const onUpload = async (e) => {
    e.preventDefault();

    if (selectedFolderId) {
      //uploading file to folder
      setLoading(true);

      const response = await AddFileToFolder({
        files: e.target.files,

        folderId: selectedFolderId
      });

      setLoading(false);

      if (response.status == 200) {
        const { folder } = response.data;

        updateView(folder);

        message.success(response.data.message);
      } else {
        message.error(response.data.name);
      }
    } else {
      //uploading file to user
      dispatch(addFileToUser({ files: e.target.files, userId: user._id }));
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
