import React from 'react';
import { FiAlertCircle, FiAlertTriangle, FiX } from 'react-icons/fi';

import classes from './alert.module.scss';

const Alert = (props) => {
  const { type, children, onClose } = props;

  const renderClasses = () => {
    let nClasses = `${classes.alert}`;

    switch (type) {
      case 'warning':
        nClasses += ` ${classes.warning}`;
        break;

      case 'danger':
        nClasses += ` ${classes.danger}`;
        break;

      default:
        break;
    }

    return nClasses;
  };

  const renderIcon = () => {
    switch (type) {
      case 'warning':
        return <FiAlertTriangle />;

      case 'danger':
        return <FiAlertCircle />;

      default:
        return <React.Fragment />;
    }
  };

  return (
    <div className={renderClasses()}>
      <div className={classes.icon}>{renderIcon()}</div>
      <div className={classes.content}>{children}</div>
      <div className={classes.close} onClick={onClose}>
        <FiX />
      </div>
    </div>
  );
};

export default Alert;
