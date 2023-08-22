/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from 'antd';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { FiCamera, FiImage, FiRepeat, FiVideo } from 'react-icons/fi';
import Webcam from 'react-webcam';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';
import { loadCameras } from './../../services/camera';
import { blobToBase64 } from './../../services/images';
import { logInformation } from './../../services/logger';

import classes from './camera.module.scss';

const Camera = (props) => {
  const { type, position, overlay, duration, upload, onSubmit } = props;

  const DEBUG_MODE = false;
  const context = useContext(SolicitudContext);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const fileRef = useRef(null);

  const [cameras, setCameras] = useState([]);
  const [currentCamera, setCurrentCamera] = useState();
  const [colorPrimary, setColorPrimary] = useState();
  const [colorText, setColorText] = useState();

  const [available, setAvailable] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const [contraints, setContraints] = useState();

  let blobs = [];
  let timer = duration;
  const [timerFormatted, setTimerFormatted] = useState();

  const isMobile = window.innerWidth <= window.innerHeight;

  // Inicializar theme
  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
    setColorText(sessionStorage.getItem('color-text'));
  }, []);

  // Cargar camaras
  useEffect(() => {
    const setup = async () => {
      try {
        let nCameras = await loadCameras();

        if (isMobile) {
          nCameras =
            position === 'back'
              ? nCameras.filter((x) => x.facingMode.includes('environment'))
              : nCameras.filter((x) => x.facingMode.includes('user'));
        }

        setCameras(nCameras);
      } catch (error) {
        if (DEBUG_MODE) {
          alert(error);
        }

        console.error(error);
      }
    };

    setup();
  }, []);

  useEffect(() => {
    if (cameras.length === 0) {
      return;
    }

    setupCamera();
  }, [cameras]);

  // Mostrar grabar despues de 1 segundo
  useEffect(() => {
    const timeout = setTimeout(() => setAvailable(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Video - Actualizar timer cada 1 segundo
  useEffect(() => {
    if (!capturing) {
      return;
    }

    const interval = setInterval(() => {
      if (timer === 0) {
        mediaRecorderRef.current.stop();
        clearInterval(interval);
        setCapturing(false);
        setFinished(true);
        return;
      }

      timer = timer - 1;
      const nTimer = formatTimer(timer);
      setTimerFormatted(nTimer);
    }, 1000);

    return () => clearInterval(interval);
  }, [capturing]);

  const setupCamera = (camera = undefined) => {
    try {
      camera = selectCamera(camera);
      setCurrentCamera(camera);

      let nContraints = {
        deviceId: camera.deviceId,
      };

      if (isMobile) {
        nContraints.width = position === 'back' ? { min: 720 } : { min: 540 };
        nContraints.height = position === 'back' ? { min: 1280 } : { min: 960 };
        nContraints.aspectRatio = 1.777777778;
      }

      setContraints(nContraints);
    } catch (error) {
      if (DEBUG_MODE) {
        alert(error);
      }
      console.error(error);
    }
  };

  const selectCamera = (camera) => {
    try {
      if (camera) {
        camera.selector = `Cambio de camara (${cameras.length} camaras)`;
        return camera;
      }

      if (!isMobile) {
        cameras[0].selector = `Version web (${cameras.length} camaras)`;
        return cameras[0];
      }

      if (cameras.length === 1) {
        cameras[0].selector = 'Camara unica';
        return cameras[0];
      }

      if (position == 'front') {
        cameras[0].selector = `Camara frontal (${cameras.length} camaras)`;
        return cameras[0];
      }

      const focusDistance = cameras.sort(
        (a, b) => (b.focusDistance?.min ?? 0) - (a.focusDistance?.min ?? 0)
      );

      const focusMode = focusDistance.filter(
        (x) => x.focusMode && x.focusMode.includes('continuous')
      );

      if (focusMode.length > 0) {
        focusMode[0].selector = `Camara trasera con focus mode continuous (${focusMode.length} camaras)`;
        return focusMode[0];
      }

      focusDistance[0].selector = `Camara trasera con focus distance mayor (${focusDistance.length} camaras)`;
      return focusDistance[0];
    } catch (error) {
      if (DEBUG_MODE) {
        alert(error);
      }
      console.error(error);
    }
  };

  const onChangeCamera = () => {
    let index = currentCamera ? cameras.indexOf(currentCamera) : -1;
    if (index === cameras.length - 1) {
      index = -1;
    }

    const nCamera = cameras[index + 1];
    setupCamera(nCamera);
  };

  const formatTimer = (seconds) => {
    const nMinutes = seconds > 59 ? Math.floor(seconds / 60) : 0;
    const nSeconds = seconds > 59 ? seconds % 60 : seconds;
    const nTimer =
      String(nMinutes).padStart(2, '0') +
      ':' +
      String(nSeconds).padStart(2, '0');

    return nTimer;
  };

  const onClickShoot = () => {
    if (type === 'photo') {
      takePicture();
    }

    if (type === 'video') {
      recordVideo();
    }
  };

  const takePicture = async () => {
    setLoading(true);
    const base64 = webcamRef.current.getScreenshot();
    onSubmit(base64, isMobile);
  };

  const recordVideo = () => {
    setTimerFormatted(formatTimer(timer));
    setCapturing(true);

    const options = {
      mimeType: MediaRecorder.isTypeSupported('video/webm')
        ? 'video/webm'
        : 'video/mp4',
    };

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, options);
    mediaRecorderRef.current.addEventListener('dataavailable', handleVideoData);
    mediaRecorderRef.current.addEventListener('stop', downloadVideo);
    mediaRecorderRef.current.start(1000);
  };

  const handleVideoData = (event) => {
    blobs.push(event.data);
  }

  const downloadVideo = async () => {
    logInformation(`Entrando a DownloadVideo (Blobs: ${blobs.length})`)
    if (blobs.length === 0) {
      return;
    }

    const video = new Blob(blobs, { type: 'video/mp4' });
    const base64 = await blobToBase64(video);
    onSubmit(base64);
  };

  const onClickUpload = () => {
    fileRef.current.click();
  };

  const onUploadFile = async (e) => {
    const files = e.currentTarget.files;
    if (files.length === 0) {
      return;
    }

    setLoading(true);
    const file = files[0];
    const base64 = await blobToBase64(file);
    onSubmit(base64, false);

    e.target.value = '';
  };

  const renderUpload = () => {
    if (!upload) {
      return (
        <div className={classes.action}>
          <div className={classes.placeholder}></div>
        </div>
      );
    }

    return (
      <div className={classes.action}>
        <div
          className={classes.upload}
          onClick={onClickUpload}
          style={{
            color: colorText,
            backgroundColor: colorPrimary,
            boxShadow: `0 0 10px ${colorPrimary}`,
          }}
        >
          <FiImage />
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={onUploadFile}
          />
        </div>
        <div className={classes.label}>Galeria</div>
      </div>
    );
  };

  const renderAction = () => {
    const icon = type === 'video' ? <FiVideo /> : <FiCamera />;
    const text = type === 'video' ? 'Grabar video' : 'Tomar foto';

    return (
      <div className={classes.action}>
        <div
          className={classes.shoot}
          onClick={onClickShoot}
          style={{
            color: colorText,
            backgroundColor: colorPrimary,
            boxShadow: `0 0 10px ${colorPrimary}`,
          }}
        >
          <div className={classes.icon}>{icon}</div>
        </div>
        <div className={classes.label}>{text}</div>
      </div>
    );
  };

  if (context.screen !== solicitud.screens.camera) {
    return;
  }

  if (!currentCamera || !contraints) {
    return;
  }

  return (
    <div className={classes.camera}>
      {contraints && (
        <Webcam
          className={classes.webcam}
          ref={webcamRef}
          videoConstraints={contraints}
          audio={false}
          forceScreenshotSourceSize
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
        />
      )}

      {DEBUG_MODE && (
        <div className={classes.debug}>
          <div>
            <span className={classes.value}>DeviceId: </span>
            {currentCamera?.deviceId ?? '-'}
          </div>
          <div>
            <span className={classes.value}>FocusDistance: </span>
            {currentCamera?.focusDistance?.min ?? '-'}
          </div>
          <div>
            <span className={classes.value}>FocusMode: </span>
            {currentCamera?.focusMode ?? '-'}
          </div>
          <div>
            <span className={classes.value}>FrameRate: </span>
            {currentCamera?.frameRate?.max ?? '-'}
          </div>
          <div>
            <span className={classes.value}>Selector: </span>
            {currentCamera?.selector ?? '-'}
          </div>
        </div>
      )}

      <div className={classes.overlay}>
        {available && overlay === 'card' && (
          <div className={classes.card}>
            {isMobile && (
              <Image
                src={
                  context.formProperty === 'frente'
                    ? '/images/id-front-vertical.png'
                    : '/images/id-back-vertical.png'
                }
                alt="Status"
                layout="fill"
                objectFit="contain"
              />
            )}
            {!isMobile && (
              <Image
                src={
                  context.formProperty === 'frente'
                    ? '/images/id-front.png'
                    : '/images/id-back.png'
                }
                alt="overlay"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        )}

        {available && overlay === 'face' && (
          <div className={classes.face}></div>
        )}

        {capturing && type === 'video' && (
          <div className={classes.timer}>
            <div className={classes.icon}></div>
            <div className={classes.text}>{timerFormatted}</div>
          </div>
        )}

        {available && !capturing && !loading && !finished && (
          <div className={classes.actions}>
            {renderUpload()}
            {renderAction()}
            {(!cameras || cameras.length === 1) && (
              <div className={classes.action}>
                <div className={classes.placeholder}></div>
              </div>
            )}
            {cameras && cameras.length > 1 && (
              <div className={classes.action}>
                <Tooltip
                  visible={true}
                  arrowPointAtCenter
                  placement="topRight"
                  title="Seleccionar Cámara"
                  color={colorPrimary}
                  overlayInnerStyle={{ fontWeight: 600, borderRadius: '10px' }}
                >
                  <div
                    className={classes.change}
                    onClick={onChangeCamera}
                    style={{
                      color: colorText,
                      backgroundColor: colorPrimary,
                      boxShadow: `0 0 10px ${colorPrimary}`,
                    }}
                  >
                    <FiRepeat />
                  </div>
                </Tooltip>
                <div className={classes.label}>Cambiar cámara</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
