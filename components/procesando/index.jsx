import Image from 'next/image';
import Card from '../ui/card';
import Header from '../ui/header';
import Highlight from '../ui/highlight';
import classes from './index.module.scss';

const Procesando = () => {
  return (
        <Card>
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
        <div className={classes.text}>
          <div className={classes.title}>
            ¡Felicitaciones!
          </div>
          <div>
          Pudimos validar tus datos y
            <Highlight primary>
            te enviaremos un email
            </Highlight>
            para contarte cómo seguir.<br/>
            <Highlight primary>No olvides revisar tu SPAM</Highlight>
          </div>
        </div>
      </div>
    </div> 
        </Card>

  );
};

export default Procesando;
