import Image from 'next/image';

import Header from '../ui/header';
import Highlight from './../ui/highlight';

import classes from './index.module.scss';

const Documento = () => {
  const type = sessionStorage.getItem('type');

  const renderText = () => {
    // Jubilo
    if (type == 'EmpadronamientoBIND') {
      return (
        <div className={classes.text}>
          <div className={classes.title}>¡Felicitaciones!</div>
          <div>
            <Highlight primary>Hemos podido validar tus datos.</Highlight>
            <div>
              Mantenerlos actualizados nos permite operar de manera más agil y
              más segura.
            </div>
            <div>
              Ante cualquier duda, comunicate al: 0810 666 0505 o chateá con
              BINDI: 113420-9812
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={classes.text}>
        <div className={classes.title}>¡Felicitaciones!</div>
        <div>
          Tu alta fue exitosa y
          <Highlight primary>te enviaremos un email</Highlight>
          para que puedas comenzar a cobrar con QR.
          <br />
          <Highlight primary>No olvides revisar tu SPAM</Highlight>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.finalizar}>
      <Header />
      <div className={classes.content}>
        <div className={classes.image}>
          <Image
            src="/images/completed.gif"
            alt="instruction"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {renderText()}
      </div>
    </div>
  );
};

export default Documento;
