import { Form, Input as Inputd } from 'antd';
import { useEffect, useState } from 'react';

const Input = (props) => {
  const {
    label,
    name,
    type,
    inputMode,
    placeholder,
    autofocus,
    required,
    readonly,
    centered,
    hidden,
    validators,
    onChange,
    maxLength,
    addonBefore,
  } = props;

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
    <Form.Item
      label={label}
      name={name}
      rules={setRules()}
      className={`${centered ? 'centered' : ''}`}
    >
      {type == 'password' ? (
        <Inputd.Password
          placeholder={placeholder}
          autoFocus={autofocus}
          readOnly={readonly}
          addonBefore={addonBefore}
          className={`${hidden && 'hidden'}`}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={renderStyle()}
        />
      ) : (
        <Inputd
          type={type ?? 'text'}
          inputMode={inputMode ?? 'text'}
          placeholder={placeholder}
          autoFocus={autofocus}
          readOnly={readonly}
          addonBefore={addonBefore}
          className={`${hidden && 'hidden'}`}
          onChange={onChange}
          maxLength={maxLength ?? 99999999}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={renderStyle()}
        />
      )}
    </Form.Item>
  );
};

export default Input;
