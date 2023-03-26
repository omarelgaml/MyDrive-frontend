/* eslint-disable react/prop-types */
import { Typography, Divider, Empty } from 'antd';
import { Icon } from 'semantic-ui-react';
const { Title } = Typography;
import { StyledRow, StyledCol, StyledImg } from './StyledComponents';
import React from 'react';
function FilesGrid(props) {
  const { view, handleFolderClick, setShowFile, setFileToShow } = props;

  const handleShowFile = (file) => {
    setShowFile();
    setFileToShow(file);
  };
  return (
    <>
      {view[view.length - 1].childFolders.length > 0 && (
        <>
          <StyledRow>
            <StyledCol span={12}>
              <Title italic level={4}>
                Folders:
              </Title>
            </StyledCol>
          </StyledRow>
          <StyledRow gutter={[32, 32]}>
            {view[view.length - 1].childFolders.map((folder, index) => (
              <StyledCol
                textAlign="center"
                cursor="pointer"
                onClick={() => handleFolderClick(folder)}
                span={4}
                key={index}>
                <Icon name="folder" size="huge" />
                <Title level={5}>{folder.name}</Title>
              </StyledCol>
            ))}
          </StyledRow>
        </>
      )}
      {view[view.length - 1].childFolders.length > 0 && <Divider />}

      {view[view.length - 1].files.length > 0 && (
        <>
          <StyledRow>
            <StyledCol span={12}>
              <Title italic level={4}>
                Files:
              </Title>
            </StyledCol>
          </StyledRow>
          <StyledRow gutter={[32, 32]}>
            {view[view.length - 1].files.map((file, index) => (
              <StyledCol
                textAlign="center"
                cursor="pointer"
                onClick={() => handleShowFile(file)}
                span={4}
                key={index}>
                {file.thumbnailUrl && (
                  <StyledImg src={`http://localhost:3000/${file.thumbnailUrl}`} />
                )}
                {!file.thumbnailUrl && (
                  <>
                    <Icon name="file" size="huge" />
                    {/* <Title level={5}>{file.originalName}</Title> */}
                  </>
                )}
                <Title level={5}>{file.originalName}</Title>
              </StyledCol>
            ))}
          </StyledRow>
        </>
      )}
      {view[view.length - 1].childFolders.length === 0 &&
        view[view.length - 1].files.length === 0 && <Empty />}
    </>
  );
}
export default React.memo(FilesGrid);
