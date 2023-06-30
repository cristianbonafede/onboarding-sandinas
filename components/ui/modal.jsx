import { Modal as Modald } from 'antd';

const Modal = (props) => {
  const { visible, title, width, centered, onClose, children } = props;

  return (
    <Modald
      visible={visible}
      title={title}
      width={width}
      centered={centered}
      onCancel={onClose}
      footer={null}
    >
      {children}
    </Modald>
  );
};

export default Modal;
