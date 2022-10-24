import styles from './Logout.module.css';


const Logout = (props) => {


  return (
    <div className={styles.divvv}>
      <button type='submit' className={styles.bbutton} onClick={props.onLoggedOut}>Logout</button>
    </div>
  );
};

export default Logout;
