import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Svg from '../svg';

import classes from './../index.module.scss';

const LayoutErrorBase = (props) => {
  const [ready, setReady] = useState(false);
  const [logo, setLogo] = useState();
  const { children } = props;

  useEffect(() => {
    setLogo(sessionStorage.getItem('logo'));
    setReady(true);
  }, []);

  const renderError = () => {
    return <div>{children}</div>;
  };

  return (
    <div className={classes.error}>
      <div className={classes.image}>
        <div className={classes.logo}>
          {logo && (
            <Image src={logo} alt="Logo" layout="fill" objectFit="contain" />
          )}
        </div>
        <Svg />
      </div>
      <div className={classes.container}>{ready && renderError()}</div>
    </div>
  );
};

export default LayoutErrorBase;
