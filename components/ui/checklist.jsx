import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';

import classes from './checklist.module.scss';

const Checklist = (props) => {
  const { onFinish } = props;

  const context = useContext(SolicitudContext);

  const [colorPrimary, setColorPrimary] = useState();

  const [start, setStart] = useState(false);
  const [list, setList] = useState([]);

  const [percentage, setPercentage] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
  }, []);

  useEffect(() => {
    if (!context.step || context.screen !== solicitud.screens.checklist) {
      return;
    }

    const nList = [...context.step.actions];
    for (let i = 0; i < nList.length; i++) {
      nList[i].completed = false;
    }

    setList(nList);
    setStart(true);
  }, [context.step, context.screen]);

  useEffect(() => {
    async function run() {
      if (!start) {
        return;
      }

      let error = false;

      for (let i = 0; i < list.length; i++) {
        // Ejecutar metodo
        const valid = await solicitud.runAction(list[i], context.form);
        if (!valid) {
          error = true;
          break;
        }

        // Actualizar porcentaje
        const nPercentage = (((i + 1) * 100) / list.length).toFixed(0);
        setPercentage(nPercentage);

        // Actualizar lista
        let nList = [...list];
        nList[i].completed = true;
        setList(nList);
      }

      if (!error) {
        setCompleted(true);

        setTimeout(() => {
          onFinish();
        }, 2000);
      }
    }

    run();
  }, [start]);

  if (context.screen !== solicitud.screens.checklist) {
    return;
  }

  return (
    <div
      className={`${classes.checklist} ${completed ? classes.completed : ''}`}
    >
      <div className={classes.container}>
        <div
          className={classes.spinner}
          style={{ borderBottomColor: colorPrimary }}
        ></div>

        {!completed && percentage > 0 && (
          <div className={classes.percentage}>{percentage}%</div>
        )}

        {completed && (
          <div className={classes.success}>
            <div className={classes.check}>
              <Image
                src="/images/check.png"
                alt="Check"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        )}

        <div className={classes.title}>
          {completed ? '¡Completado!' : 'Procesando...'}
        </div>
      </div>
    </div>
  );
};

export default Checklist;
