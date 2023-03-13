/* eslint-disable react/prop-types */
import { Button } from 'antd';

const fileDisplayStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  zIndex: '10'
};
function ShowFile(props) {
  return (
    <div style={fileDisplayStyle}>
      <object
        data={`http://localhost:3000/${props.fileToShow}.pdf`}
        //  type="application/pdf"
        width="100%"
        height="600px">
        <p>Sorry, your browser does not support embedded PDF files.</p>
      </object>
      <Button onClick={() => props.close()}>Close Document</Button>
    </div>
  );
}
export default ShowFile;
