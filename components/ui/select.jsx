import { Form, Select as Selectd } from 'antd';
import { useEffect, useState } from 'react';

const Select = (props) => {
  const { label, name, options, text, value, required, autofocus, validators } =
    props;

  const [focused, setFocused] = useState(false);
  const [colorPrimary, setColorPrimary] = useState();

  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
  }, []);

  const renderStyle = () => {
    const style = {
      borderColor: focused ? colorPrimary : '#d8d6de',
    };

    return style;
  };

  const setRules = () => {
    let rules = [];

    if (required) {
      rules.push({
        required: true,
        message: 'Este campo es obligatorio',
      });
    }

    if (!validators) {
      return rules;
    }

    for (let i = 0; i < validators.length; i++) {
      rules.push(validators[i]);
    }

    return rules;
  };

  return (
    <Form.Item label={label} name={name} rules={setRules()}>
      <Selectd
        autoFocus={autofocus}
        allowClear
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={renderStyle()}
      >
        {options.map((option, index) => (
          <Selectd.Option key={index} value={option[value ?? 'value']}>
            {option[text ?? 'text']}
          </Selectd.Option>
        ))}
      </Selectd>
    </Form.Item>
  );
};

export default Select;
