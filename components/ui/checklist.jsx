import { Progress } from 'antd';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';

import classes from './checklist.module.scss';

const Checklist = (props) => {
  const { onFinish } = props;

  const itemRef = useRef(null);

  const context = useContext(SolicitudContext);

  const [colorPrimary, setColorPrimary] = useState();

  const [start, setStart] = useState(false);
  const [list, setList] = useState([]);

  const [current, setCurrent] = useState();
  const [percentage, setPercentage] = useState(0);

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
      if (!start || list.length === 0) {
        return;
      }

      let error = false;

      for (let i = 0; i < list.length; i++) {
        setCurrent(list[i]);

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
        setCurrent(undefined);
        onFinish();
      }
    }

    run();
  }, [start]);

  useEffect(() => {
    if (!current || !itemRef.current) {
      return;
    }

    scroll(itemRef.current);
  }, [current]);

  const scroll = (element) => {
    var container = element.parentElement;

    const elementTop = element.offsetTop;
    const elementBottom = elementTop + element.clientHeight;

    const containerTop = container.offsetTop;
    const containerBottom = containerTop + container.clientHeight;

    const visible =
      elementTop >= containerTop && elementBottom <= containerBottom;

    if (!visible) {
      container.scrollTo({
        top: elementTop,
        behavior: 'smooth',
      });
    }
  };

  if (context.screen !== solicitud.screens.checklist) {
    return;
  }

  return (
    <div className={classes.checklist}>
      <div className={classes.progress}>
        <Progress
          type="circle"
          percent={percentage}
          width={150}
          strokeWidth={7}
          strokeColor={{
            '0%': colorPrimary,
            '100%': colorPrimary,
          }}
          format={(value) =>
            value === '100' ? (
              <Image
                src="/images/check.png"
                alt="Check"
                height={60}
                width={60}
              />
            ) : (
              `${value}%`
            )
          }
        />
      </div>

      <div className={classes.section}>Procesando...</div>

      {/* <div className={classes.list}>
        {list.filter(d=> d.title).map((item, index) => (
          <div
            key={index}
            className={`${classes.item} 
            ${current === item && classes.current} 
            ${item.completed && classes.completed}`}
            ref={current === item ? itemRef : null}
          >
            {item.completed && (
              <div className={classes.status}>
                <Image
                  src="/images/check.png"
                  alt="Completed"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
            {item.title && (
            <div className={classes.title}>{item.title}</div>

            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Checklist;
