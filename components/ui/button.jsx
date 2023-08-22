import { useEffect, useState } from 'react';

import { Button as Buttond } from 'antd';

const Button = (props) => {
  const { type, text, htmlType, block, loading, disabled, onClick } = props;

  const [visible, setVisible] = useState(false);
  const [colorPrimary, setColorPrimary] = useState();
  const [colorText, setColorText] = useState();

  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
    setColorText(sessionStorage.getItem('color-text'));
    setVisible(true);
  }, []);

  const renderStyles = () => {
    if (disabled) {
      return {
        backgroundColor: '#d1d1d1',
        color: '#888888',
        cursor: 'not-allowed',
        boxShadow: 'none',
      };
    }
    
    if (type === 'secondary') {
      return {
        color: colorPrimary,
      };
    }

    return {
      color: colorText,
      backgroundColor: colorPrimary,
      boxShadow: `0 0 10px ${colorPrimary}`,
    };
  };

  const onHandleClick = async () => {
    if (onClick) {
      await onClick();
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <Buttond
      className={`${block ? 'block' : ''}`}
      type={type}
      disabled={disabled}
      htmlType={htmlType}
      loading={loading}
      style={renderStyles()}
      onClick={onHandleClick}
    >
      {loading ? '' : text}
    </Buttond>
  );
};

export default Button;
