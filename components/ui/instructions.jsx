import Image from 'next/image';
import { useContext } from 'react';

import Button from './button';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';

import classes from './instructions.module.scss';

const Instructions = (props) => {
  const { image, vertical, children, nextScreen } = props;

  const context = useContext(SolicitudContext);

  const onClickNext = () => {
    context.changeScreen(nextScreen);
  };

  if (context.screen !== solicitud.screens.instructions) {
    return;
  }

  return (
    <div className={classes.instructions}>
      <div className={classes.content}>
        <div className={`${classes.image} ${vertical && classes.vertical}`}>
          <Image
            src={image}
            alt="instruction"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={classes.description}>{children}</div>
      </div>
      <div className={classes.actions}>
        <Button block type="primary" text="Siguiente" onClick={onClickNext} />
      </div>
    </div>
  );
};

export default Instructions;
