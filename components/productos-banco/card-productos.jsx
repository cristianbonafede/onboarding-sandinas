import { useContext, useEffect, useState } from 'react';

import Image from 'next/image';
import http from '../../services/http';
import Checkbox from '../ui/checkbox';
import Form from '../ui/form';
import classes from './card-productos.module.scss';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

const CardProducts = (props) => {
  const context = useContext(SolicitudContext);
  const [colorPrimary, setColorPrimary] = useState();

  const [valid, setValid] = useState(false);
  const [productosBanco, setProductosBanco] = useState([]);

  const [productosBancoId, setProductosId] = useState([]);

  useEffect(() => {
    async function getProductosBanco() {

      const id = sessionStorage.getItem('entidad');
      const response = await http.get(`${process.env.NEXT_PUBLIC_API_URL}/entidades/${id}/productosbanco`);
      if (response) {
        const data = response.data;
        setProductosBanco(data);
      }
    }
    getProductosBanco();
  }, []);

  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
  }, []);

  useEffect(() => {
    if (valid) {
      context.changeScreen(solicitud.screens.checklist);
    }
  }, [valid]);

  const onSubmit = async () => {
    context.updateForm(productosBancoId);
    setValid(true)
  };

  const onCheckboxChange = (productoId, value) => {
    let ids = [...productosBancoId];

    if (value) ids.push(productoId);
    else ids = ids.filter(id => productoId != id);

    setProductosId(ids);
  }

  if (context.screen !== solicitud.screens.instructions) {
    return;
  }

  return (
    <Form onSubmit={onSubmit}>
      {productosBanco.map((productoBanco, index) => (
        <div key={index} className={classes.card} style={{ borderColor: colorPrimary }}>
          <div className={classes.header}>
            <h3 className={classes.titulo}>{productoBanco.titulo}</h3>
            <div className={classes.image}>
              <Image src={productoBanco.imagen} alt="imagen" layout="fill" objectFit="cover" />
            </div>
          </div>
          <p>{productoBanco.parrafo}</p>
          <Checkbox label="Me interesa este producto" name={productoBanco.id} onChange={(value) => onCheckboxChange(productoBanco.id, value)} />
        </div>
      ))}
    </Form>
  );
};

export default CardProducts;
