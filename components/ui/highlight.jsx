import { useEffect, useState } from 'react';

import classes from './highlight.module.scss';

const Highlight = (props) => {
  const { children, primary } = props;

  const [colorPrimary, setColorPrimary] = useState();

  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
  }, []);

  return (
    <span className={classes.highlight} style={{ color: colorPrimary }}>
      {' '}
      {children}{' '}
    </span>
  );
};

export default Highlight;
