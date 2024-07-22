import { googleLoginWithPopup } from '../../utils/firebase/login';

const GoogleLoginBtn = ({ setIsLoading, setLoginData, setIsLoggedIn }) => {
  const styles = {
    button: {
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      WebkitAppearance: 'none',
      backgroundColor: '#f2f2f2',
      backgroundImage: 'none',
      border: 'none',
      WebkitBorderRadius: '4px',
      borderRadius: '4px',
      WebkitBoxSizing: 'border-box',
      boxSizing: 'border-box',
      color: '#1f1f1f',
      cursor: 'pointer',
      fontFamily: "'Roboto', arial, sans-serif",
      fontSize: '14px',
      height: '40px',
      letterSpacing: '0.25px',
      outline: 'none',
      overflow: 'hidden',
      padding: '0 12px',
      position: 'relative',
      textAlign: 'center',
      WebkitTransition: 'background-color .218s, border-color .218s, box-shadow .218s',
      transition: 'background-color .218s, border-color .218s, box-shadow .218s',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      width: 'auto',
      maxWidth: '400px',
      minWidth: 'min-content',
    },
    icon: {
      height: '20px',
      marginRight: '12px',
      minWidth: '20px',
      width: '20px',
    },
    contentWrapper: {
      WebkitAlignItems: 'center',
      alignItems: 'center',
      display: 'flex',
      WebkitFlexDirection: 'row',
      flexDirection: 'row',
      WebkitFlexWrap: 'nowrap',
      flexWrap: 'nowrap',
      height: '100%',
      justifyContent: 'space-between',
      position: 'relative',
      width: '100%',
    },
    contents: {
      WebkitFlexGrow: 1,
      flexGrow: 1,
      fontFamily: "'Roboto', arial, sans-serif",
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      verticalAlign: 'top',
    },
    state: {
      WebkitTransition: 'opacity .218s',
      transition: 'opacity .218s',
      bottom: 0,
      left: 0,
      opacity: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    disabled: {
      cursor: 'default',
      backgroundColor: '#ffffff61',
    },
    disabledState: {
      backgroundColor: '#1f1f1f1f',
    },
    disabledContents: {
      opacity: '38%',
    },
    disabledIcon: {
      opacity: '38%',
    },
    activeState: {
      backgroundColor: '#001d35',
      opacity: '12%',
    },
    hover: {
      WebkitBoxShadow: '0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)',
      boxShadow: '0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)',
    },
    hoverState: {
      backgroundColor: '#001d35',
      opacity: '8%',
    },
  };

  async function loginToGoogle() {
    setIsLoading(true);
    const res = await googleLoginWithPopup();
    console.log(res);
    setLoginData(res);
    setIsLoading(false);
    setIsLoggedIn(true);
  }

  return (
    <button
      // @ts-ignore
      style={styles.button}
      className="gsi-material-button"
      onClick={loginToGoogle}>
      <div
        // @ts-ignore
        style={styles.state}
        className="gsi-material-button-state"></div>
      <div
        // @ts-ignore
        style={styles.contentWrapper}
        className="gsi-material-button-content-wrapper">
        <div style={styles.icon} className="gsi-material-button-icon">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ display: 'block' }}>
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        <span style={styles.contents} className="gsi-material-button-contents">
          구글 로그인
        </span>
        <span style={{ display: 'none' }}>구글 로그인</span>
      </div>
    </button>
  );
};

export default GoogleLoginBtn;
