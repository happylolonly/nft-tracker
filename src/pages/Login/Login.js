import React, { useState } from 'react';
import styles from './Login.module.scss';
import { useMoralis } from 'react-moralis';
import { Redirect, useHistory } from 'react-router-dom';
import metamaskLogo from '../../assets/metamaskLogo.png';
import GoogleLogin from 'react-google-login';

const Login = () => {
  const { authenticate, isAuthenticated } = useMoralis();
  const [isGoodleLogin, setIsGoodleLogin] = useState(false);
  const history = useHistory();

  if (isAuthenticated || isGoodleLogin) {
    return <Redirect to="/" />;
  }
  async function loginHandler(provider) {
    try {
      authenticate({
        provider,
        onSuccess: () => {
          history.push('/home');
        },
        onError(error) {
          console.error(error);
          // alert(error.message, JSON.stringify(error)); // TODO: show on UI
        },
      });
    } catch (error) {
      console.error(error);
      // alert(error.message, JSON.stringify(error));
    }
  }

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.mainTitle}>Tracker</div>
      <div className={styles.mainContent}>
        <div className={styles.textWrapper}>
          <span className={styles.hugeTitle}>Gallery</span>
          <span className={styles.hugeTitle}>of NFT works</span>
          <span className={styles.smallTitle}>Find tokens to your liking</span>
        </div>

        {window.ethereum && (
          <button className={styles.buttonWrapper} onClick={() => loginHandler()}>
            <div>
              <div className={styles.metamaskLogo}>
                <img src={metamaskLogo} alt="MetaMask logo" />
              </div>
              <span className={styles.buttonLabelBold}>MetaMask</span>
              <span className={styles.buttonLabel}>
                One of the most secure wallets with great flexibility
              </span>
            </div>
          </button>
        )}

        <button className={styles.buttonWrapper} onClick={() => loginHandler('walletconnect')}>
          <div>
            <div className={styles.buttonLogo} />
            <span className={styles.buttonLabelBold}>Wallet connect</span>
            <span className={styles.buttonLabel}>Choose your preferred wallet</span>
          </div>
        </button>
        <button className={styles.buttonWrapper} /* onClick={() => googleLoginHandler()} */>
          <div>
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </button>
        <div className={styles.footer}>
          <span>
            We do not own your private keys and cannot access your funds without your confirmation.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
