import { Form, Input as Inputd } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import FormContext from '../../store/form-context';

import classes from './checkbox.module.scss';

const Checkbox = (props) => {
  const { label, name, required, validators, onChange, description } = props;

  const context = useContext(FormContext);

  const [checked, setChecked] = useState(false);
  const [colorPrimary, setColorPrimary] = useState();

  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
  }, []);

  const renderStyle = () => {
    const style = {
      borderColor: checked ? colorPrimary : '#d8d6de',
      backgroundColor: checked ? colorPrimary : '#ffffff',
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

    return rules;
  };

  const onClick = () => {
    let nForm = {};
    nForm[name] = checked ? '' : 'true';
    context.form.setFieldsValue(nForm);
    setChecked(!checked);

    if (onChange) {
      onChange(!checked, context.form);
    }
  };

  return (
    <Form.Item name={name} rules={setRules()}>
      <div className={classes.checkbox}>
        <div className={classes.box} style={renderStyle()} onClick={onClick}>
          <FaCheck />
        </div>
        <div className={classes.row}>
          <div className={classes.label}>
            <b>{label}</b>
          </div>
          <div className={classes.description}>{description}</div>{' '}
        </div>
      </div>
      <Inputd className="hidden" />
    </Form.Item>
  );
};

export default Checkbox;
