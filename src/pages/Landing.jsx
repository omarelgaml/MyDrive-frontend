import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, addFolderToUser } from '../redux/thunks/userThunks';
import { Typography, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import MyModal from '../components/MyModal';
import ShowFile from '../components/ShowFile';
import AddFolderToFolder from '../actions/addFolderToFolder';
import GetFolder from '../actions/getFolder';
import { StyledRow, StyledCol, StyledSpace, StyledButton } from '../components/StyledComponents';
const { Text } = Typography;

import FilesGrid from '../components/FilesGrid';
import Uploader from '../components/Uploader';
import Spinner from '../components/Spinner';

function Landing() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const userLoading = useSelector((state) => state.user.loading);

  const [showModal, setShowModal] = useState(false);

  const [selectedFolderId, setSelectedFolderId] = useState('');

  const [fileToShow, setFileToShow] = useState('');

  const [showFile, setShowFile] = useState(false);

  //this to handle loading in case of adding folder to folder or file to folder
  const [folderLoading, setFolderLoading] = useState(false);

  //deal with this list as an arraylist in which keep track of the history in case of
  //going inside folders
  const [view, setView] = useState([]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  //when the current folder changes by adding new file or folder to it, I take the updated folder from the database
  //and update the tail if the view
  const updateView = (folder) => {
    const obj = { childFolders: folder.childFolders, files: folder.files, name: folder.name };

    let newView = [...view];

    newView.pop();

    newView.push(obj);

    setView(newView);
  };
  useEffect(() => {
    if (user && Object.keys(user).length) {
      const obj = { childFolders: user.childFolders, files: user.files, name: 'Root' };

      let newView = [...view];

      newView[0] = obj;

      setView(newView);
    }
  }, [user]);

  // handeling removing the tail of the view
  const goBack = () => {
    const newView = [...view];

    if (newView.length > 1) {
      newView.pop();

      setView(newView);
    }
    if (newView.length == 1) {
      setSelectedFolderId('');
    }
  };

  // when a folder is clicked, I fetch this folder from the database and place it at the tail of the view
  const handleFolderClick = async (folId) => {
    setSelectedFolderId(folId);

    setFolderLoading(true);

    const response = await GetFolder({ id: folId });

    setFolderLoading(false);

    if (response.status == 200) {
      const { folder } = response.data;

      const obj = { childFolders: folder.childFolders, files: folder.files, name: folder.name };

      let newView = [...view];

      newView.push(obj);

      setView(newView);
    } else {
      message.error(response.data.name);
    }
  };

  //when add folder is clicked, there are two cases, to be clicked to add folder to the user , or adding nested folder
  //inside another folder.
  const clickAddFolder = async ({ name }) => {
    if (selectedFolderId == '') {
      //adding foler to user
      dispatch(addFolderToUser(name));
    } else {
      //adding folder inside folder

      setFolderLoading(true);

      const body = { name, parentFolder: selectedFolderId };

      const resp = await AddFolderToFolder(body);

      if (resp.status == 200) {
        const { folder } = resp;

        updateView(folder);

        setFolderLoading(false);

        message.success(resp.data.message);
      } else {
        setFolderLoading(false);

        message.error(resp.data.name);
      }
    }
    setShowModal(false);
  };
  return (
    <StyledSpace direction="vertical" width="100%" padding="2%" size={[0, 12]}>
      {/* The back button and the name of the current folder */}

      <StyledRow>
        <StyledCol span={1}>
          <LeftOutlined onClick={goBack} />
        </StyledCol>
        <StyledCol span={2}>
          {view.length > 0 && <Text>{`${view[view.length - 1].name}`}</Text>}
        </StyledCol>
      </StyledRow>

      {/* The Modal of taking folder name from the user */}
      {(userLoading || folderLoading) && <Spinner />}
      <MyModal
        showModal={showModal}
        cancel={() => setShowModal(false)}
        clickAddFolder={(value) => clickAddFolder(value)}
      />

      {/*The view which presents the chosen file*/}
      {showFile && <ShowFile fileToShow={fileToShow} close={() => setShowFile(false)} />}

      {/*The add folder, uploder file and logout buttons*/}
      <StyledRow>
        <StyledCol xs={24} sm={24} md={8} lg={3} xl={3}>
          <StyledButton onClick={() => setShowModal(true)}>Add folder</StyledButton>
        </StyledCol>

        <StyledCol xs={24} sm={24} md={8} lg={3} xl={3}>
          <Uploader
            updateView={(folder) => updateView(folder)}
            user={user}
            selectedFolderId={selectedFolderId}
            setLoading={(val) => setFolderLoading(val)}
          />
        </StyledCol>

        <StyledCol textAlign="right" xs={24} sm={24} md={8} lg={{ span: 4, offset: 14 }}>
          <StyledButton
            onClick={() => window.open('http://localhost:3000/api/auth/logout', '_self')}>
            logout
          </StyledButton>
        </StyledCol>
      </StyledRow>
      {/************/}

      {/*The Grid which views the folders and files*/}
      {view.length != 0 && (
        <FilesGrid
          view={view}
          handleFolderClick={(folder) => handleFolderClick(folder._id)}
          setShowFile={() => setShowFile(true)}
          setFileToShow={(file) => setFileToShow(file)}
        />
      )}
    </StyledSpace>
  );
}

export default Landing;
