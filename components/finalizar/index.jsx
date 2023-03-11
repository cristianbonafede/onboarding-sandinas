import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import http from '../../services/http';

import { solicitud } from '../../models/solicitud';


import Header from '../ui/header';
import Highlight from './../ui/highlight';

import classes from './index.module.scss';

const Documento = () => {
  const router = useRouter();
  const idEntidad = sessionStorage.getItem('entidad');


  useEffect(() => {
    async function getData() {
      const response = await solicitud.get();
      setCbu(`(${response.cbu})`);
    }

    getData();
  }, []);

  
  const [cbu, setCbu] = useState('');
      
  
  const getData = setTimeout(async () => {
  const response = await http.get(
        `entidades/${idEntidad}`
      );
   if (response) {

     
      }
    }, 10000);

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
        <div className={classes.text}>
          <div className={classes.title}>
            ¡Felicitaciones!
          </div>
          <div>
          Tu alta fue exitosa y
            <Highlight primary>
            te enviaremos un email
            </Highlight>
            para que puedas comenzar a cobrar con QR.<br/>
            <Highlight primary>No olvides revisar tu SPAM</Highlight>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documento;
