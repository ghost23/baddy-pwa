import React from 'react';
import styles from './Start.module.css';
import logo from '../assets/baddy-trainer-logo.png';

const App: React.FC = () => {
  return (
    <div className={styles.Start}>
      <div className={styles.logoContainer}>
        <img src={logo} width={241} height={173} />
      </div>
    </div>
  );
};

export default App;
