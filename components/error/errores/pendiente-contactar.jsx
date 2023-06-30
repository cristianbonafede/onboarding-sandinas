import Image from 'next/image';

import Card from '../../ui/card';
import Header from '../../ui/header';
import Layout from '../../ui/layout';

import classes from './pendiente-bindid.module.scss';

const PendienteContactar = () => {
  return (
    <Layout>
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
              <div className={classes.title}>¡Felicitaciones!</div>
              <div>Pudimos validar tus datos!</div>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default PendienteContactar;
