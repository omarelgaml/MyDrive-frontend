import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, addFolder } from '../redux/userSlice';
import { Col, Row, Space, Button, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import MyModal from '../components/MyModal';
import ShowFile from '../components/ShowFile';

const { Title, Text } = Typography;
import { Icon } from 'semantic-ui-react';
import axios from '../axios';

function Landing() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [selectedFolderName, setSelectedFolderName] = useState('Root');

  const [fileToShow, setFileToShow] = useState('');
  const [showFile, setShowFile] = useState(false);
  const [view, setView] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  useEffect(() => {
    if (Object.keys(user).length) {
      const obj = { childFolders: user.childFolders, files: user.files };
      let newView = [...view];
      newView[0] = obj;
      setView(newView);
    }
  }, [user]);

  /**************** */
  const onChange = (e) => {
    console.log(e.target.files);
    setFiles(e.target.files);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('uploadImages', files[i]);
    }
    formData.append('userId', user._id);
    formData.append('folderId', selectedFolderId);

    if (selectedFolderId) {
      try {
        const response = await axios.post('/folders/upload-to-folder', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setFiles([]);
        const { folder } = response.data;
        console.log(folder);
        const obj = { childFolders: folder.childFolders, files: folder.files };
        let newView = [...view];
        newView.pop();
        newView.push(obj);
        setView(newView);
      } catch (err) {
        if (err.response.status === 500) {
          console.log(err);
        } else {
          console.log(err.response.data.msg);
        }
      }
    } else {
      console.log(user._id);
      await axios.post('/folders/add-file-to-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(getCurrentUser());
    }
    setFiles([]);
  };
  const goBack = () => {
    const newView = [...view];
    if (newView.length > 1) {
      newView.pop();
      setView(newView);
    }
    if (newView.length == 1) {
      setSelectedFolderId('');

      setSelectedFolderName('Root');
    }
  };
  const handleFolderClick = async (folId, folName) => {
    setSelectedFolderName(folName);
    setSelectedFolderId(folId);
    const response = await axios.post('/folders/get-by-id', { id: folId });
    const { folder } = response.data;
    console.log(folder);
    const obj = { childFolders: folder.childFolders, files: folder.files };
    let newView = [...view];
    newView.push(obj);
    setView(newView);
  };
  const clickAddFolder = async ({ name }) => {
    if (selectedFolderId == '') {
      dispatch(addFolder(name));
    } else {
      const body = { name, parentFolder: selectedFolderId };
      const resp = await axios.post('/folders/add-folder-to-folder', body);
      console.log(resp);
      const { folder } = resp.data;
      const obj = { childFolders: folder.childFolders, files: folder.files };

      let newView = [...view];
      newView.pop();
      newView.push(obj);
      setView(newView);
    }
    setShowModal(false);
  };
  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          //paddingTop: '5%',
          padding: '2%'
        }}
        size={[0, 12]}>
        <LeftOutlined onClick={goBack} />
        <MyModal
          showModal={showModal}
          cancel={() => setShowModal(false)}
          clickAddFolder={(value) => clickAddFolder(value)}
        />

        {showFile && <ShowFile fileToShow={fileToShow} close={() => setShowFile(false)} />}

        <Row style={{ marginBottom: '2%' }}>
          <Col style={{ textAlign: 'center' }} span={3}>
            <Text>{`Current directory: ${selectedFolderName}`}</Text>
          </Col>
          <Col span={3}>
            <Button onClick={() => setShowModal(true)} style={{ textAlign: 'center' }} level={2}>
              add folder
            </Button>
          </Col>
          <Col span={2}>
            <form onSubmit={onSubmit}>
              <div>
                <input type="file" id="file" name="uploadImages" multiple onChange={onChange} />
              </div>
              <input type="submit" value="Upload" />
            </form>
          </Col>
          <Col style={{ textAlign: 'right' }} span={4} offset={12}>
            <Button
              onClick={() => window.open('http://localhost:3000/api/auth/logout', '_self')}
              level={2}>
              logout
            </Button>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          {view.length != 0 && (
            <>
              {view[view.length - 1].childFolders.map((folder, index) => (
                <Col
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => handleFolderClick(folder._id, folder.name)}
                  span={4}
                  key={index}>
                  <Icon name="folder" size="huge" />
                  <Title level={5}>{folder.name}</Title>
                </Col>
              ))}
              {view[view.length - 1].files.map((folder, index) => (
                <Col
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => {
                    setShowFile(true);
                    setFileToShow(folder._id);
                  }}
                  span={4}
                  key={index}>
                  <Icon name="file" size="huge" />
                  <Title level={5}>{folder.originalName}</Title>
                </Col>
              ))}
            </>
          )}
        </Row>
      </Space>
    </>
  );
}

export default Landing;
