import { Form as Formd } from 'antd';
import { useEffect, useState } from 'react';

import Button from './button';

import { FormContextProvider } from '../../store/form-context';
import classes from './form.module.scss';

const Form = (props) => {
  const { children, centered, values, renderButtons, onSubmit, labelButton } =
    props;

  const [form] = Formd.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (values) {
      form.setFieldsValue(values);
    }
  }, [values]);

  const onFinish = async (values) => {
    setLoading(true);
    await onSubmit(values);
    setLoading(false);
  };

  const buttonText = labelButton || 'Siguiente';

  return (
    <FormContextProvider form={form}>
      <Formd
        form={form}
        className={`${classes.form} ${centered && classes.centered}`}
        layout="vertical"
        onFinish={onFinish}
      >
        <div className={classes.content}>{children}</div>
        <div
          className={classes.actions}
          style={{ marginTop: renderButtons ? '-70px' : '' }}
        >
          {renderButtons && renderButtons()}
          <Button
            block
            type="primary"
            text={buttonText}
            htmlType="submit"
            loading={loading}
          />
        </div>
      </Formd>
    </FormContextProvider>
  );
};

export default Form;
