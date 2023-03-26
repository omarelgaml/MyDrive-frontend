/* eslint-disable react/prop-types */
import { FileDisplay, ObjectDisplay, StyledButton } from './StyledComponents';

function ShowFile(props) {
  const { fileToShow, close } = props;
  return (
    <FileDisplay>
      <ObjectDisplay data={`http://localhost:3000/${fileToShow._id}.${fileToShow.extension}`}>
        <p>Sorry, your browser does not support embedded files.</p>
      </ObjectDisplay>
      <p>{`${fileToShow.originalName}`}</p>

      <StyledButton onClick={() => close()}>Close Document</StyledButton>
    </FileDisplay>
  );
}

export default ShowFile;
