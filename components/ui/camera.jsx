/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from 'antd';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FiCamera, FiImage, FiRepeat, FiVideo } from 'react-icons/fi';
import Webcam from 'react-webcam';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';
import { blobToBase64 } from './../../services/images';

import classes from './camera.module.scss';

const Camera = (props) => {
  const { type, position, overlay, duration, upload, onSubmit } = props;

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
  const [recordedChunks, setRecordedChunks] = useState([]);

  const [contraints, setContraints] = useState();

  const isMobile = window.innerWidth <= window.innerHeight;

  // Inicializar theme
  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
    setColorText(sessionStorage.getItem('color-text'));
  }, []);

  // Cargar camaras
  useEffect(() => {
    const jsonCameras = sessionStorage.getItem('cameras');
    let nCameras = JSON.parse(jsonCameras);

    if (isMobile) {
      nCameras =
        position === 'back'
          ? nCameras.filter((x) => x.facingMode.includes('environment'))
          : nCameras.filter((x) => x.facingMode.includes('user'));
    }

    setCameras(nCameras);
  }, []);

  useEffect(() => {
    if (cameras.length === 0) {
      return;
    }

    setupCamera();
  }, [cameras]);

  const setupCamera = (camera = undefined) => {
    const deviceId = selectCamera(camera);

    let nContraints = {
      deviceId: deviceId,
    };

    if (isMobile) {
      nContraints.width = position === 'back' ? { min: 720 } : { min: 540 };
      nContraints.height = position === 'back' ? { min: 1280 } : { min: 960 };
      nContraints.aspectRatio = 1.777777778;
    }

    setContraints(nContraints);
  };

  const selectCamera = (camera) => {
    if (camera) {
      return camera.deviceId;
    }

    if (!isMobile || cameras.length === 1) {
      return cameras[0].deviceId;
    }

    if (position == 'back') {
      const focusDistance = cameras.sort(
        (a, b) => (b.focusDistance?.min ?? 0) - (a.focusDistance?.min ?? 0)
      );
      const focusMode = focusDistance.filter((x) =>
        x.focusMode.includes('continuous')
      );

      if (focusMode.length > 0) {
        return focusMode[0].deviceId;
      }

      return focusDistance[0].deviceId;
    }

    return cameras[0].deviceId;
  };

  const onChangeCamera = () => {
    let index = currentCamera ? cameras.indexOf(currentCamera) : -1;
    if (index === cameras.length - 1) {
      index = -1;
    }

    const nCamera = cameras[index + 1];
    sessionStorage.setItem('camera', JSON.stringify(nCamera));

    setCurrentCamera(nCamera);
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

  let timerDuration = duration;
  const [timer, setTimer] = useState(formatTimer(duration));

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

  const recordVideo = useCallback(() => {
    setCapturing(true);

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: MediaRecorder.isTypeSupported('video/webm')
        ? 'video/webm'
        : 'video/mp4',
    });

    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const stopVideo = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback(async () => {
    if (recordedChunks.length) {
      setLoading(true);

      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      });

      const base64 = await blobToBase64(blob);
      // previewVideo(base64);
      onSubmit(base64);

      setRecordedChunks([]);
    }
  }, [recordedChunks]);

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

  useEffect(() => {
    // Mostrar grabar despues de 1 segundo
    const timeout = setTimeout(() => setAvailable(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Actualizar timer cada 1 segundo
    if (!capturing) return;

    const interval = setInterval(() => {
      timerDuration = timerDuration - 1;
      setTimer(formatTimer(timerDuration));

      if (timerDuration < 0) {
        clearInterval(interval);
        stopVideo();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [capturing]);

  useEffect(() => {
    if (capturing || recordedChunks.length === 0) return;
    handleDownload();
  }, [recordedChunks]);

  if (context.screen !== solicitud.screens.camera) {
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
            <div className={classes.text}>{timer}</div>
          </div>
        )}

        {available && !capturing && !loading && (
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
