import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import SolicitudContext from '../../store/solicitud-context';

import CardProducts from '../productos-banco/card-productos';
import Checklist from '../ui/checklist';
import Header from '../ui/header';
import classes from './index.module.scss';

const ProductosBanco = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const validateStep = async () => {
      const redirect = await context.validateStep(router);
      if (redirect) {
        router.push(redirect);
        return;
      }

      setVisible(true);
      context.updateStep(router);
    };

    validateStep();
  }, [context.steps]);

  const onFinish = async () => {
    await context.nextStep(router);
  };

  if (!visible) {
    return <div className="not-allowed"></div>;
  }

  return (
    <div className={classes.productosBanco}>
      <Header />
      <CardProducts />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default ProductosBanco;
