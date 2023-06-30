import Image from 'next/image';
import Modal from '../ui/modal';

import Button from '../ui/button';
import Highlight from '../ui/highlight';

import classes from './modal-tramite.module.scss';

const ModalTramite = (props) => {
  const { visible, onClose } = props;

  return (
    <Modal
      centered
      visible={visible}
      width={400}
      title="Número de trámite"
      onClose={onClose}
    >
      <div className={classes.content}>
        <div className={classes.description}>
          <div>Figuran en el frente o dorso de tu DNI</div>
          <div>
            Son los primeros <Highlight>11 dígitos</Highlight>
          </div>
        </div>
        <div className={classes.image}>
          <Image
            src="/images/nro-tramite-front.png"
            alt="instruction"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={classes.image}>
          <Image
            src="/images/nro-tramite-back.png"
            alt="instruction"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={classes.actions}>
          <Button block type="primary" text="Continuar" onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalTramite;
