import classes from './spinner.module.scss';
const Spinner = (props) => {
  const { visible } = props;

  if (!visible) {
    return null;
  }

  return (
    <div className={classes.checklist}>
      <div className={classes.container}>
        <div
          className={classes.spinner}
          style={{ borderBottomColor: '#FFAC1C' }}
        ></div>
        <div className={classes.title}>Aguarde un momento...</div>
      </div>
    </div>
  );
};

export default Spinner;
