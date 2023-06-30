import Image from 'next/image';

import Card from '../../ui/card';
import Layout from '../../ui/layout';
import Header from './../../ui/header';
import Highlight from './../../ui/highlight';

import classes from './pendiente-bindid.module.scss';

const PendienteBindid = () => {
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
              <div>
                Pudimos validar tus datos y
                <Highlight primary>te enviaremos un email</Highlight>
                para contarte cómo seguir.
                <br />
                <Highlight primary>No olvides revisar tu SPAM</Highlight>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default PendienteBindid;
