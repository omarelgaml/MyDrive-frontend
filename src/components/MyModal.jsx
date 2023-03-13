/* eslint-disable react/prop-types */
import { Form, Input, Modal } from 'antd';

function MyModal(props) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={props.showModal}
      title="Select name"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => props.cancel()}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            props.clickAddFolder(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}>
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default MyModal;
