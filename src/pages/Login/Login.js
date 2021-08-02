import React from "react";
import styles from "./Login.module.scss";
import { useMoralis } from "react-moralis";
import { Redirect, useHistory } from "react-router-dom";

const Login = () => {
  const { authenticate, isAuthenticated } = useMoralis();
  const history = useHistory();

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  async function loginHandler(provider) {
    try {
      authenticate({
        provider,
        onSuccess: () => {
          history.push("/home");
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
          <button
            className={styles.buttonWrapper}
            onClick={() => loginHandler()}
          >
            <div>
              <div className={styles.buttonLogo} />
              <span className={styles.buttonLabelBold}>MetaMask</span>
              <span className={styles.buttonLabel}>
                {/* Choose your preferred wallet */}
              </span>
            </div>
          </button>
        )}

        <button
          className={styles.buttonWrapper}
          onClick={() => loginHandler("walletconnect")}
        >
          <div>
            <div className={styles.buttonLogo} />
            <span className={styles.buttonLabelBold}>Wallet connect</span>
            <span className={styles.buttonLabel}>
              Choose your preferred wallet
            </span>
          </div>
        </button>
        <div className={styles.footer}>
          <span>
            We do not own your private keys and cannot access your funds without
            your confirmation.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
