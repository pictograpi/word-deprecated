export default authService;

authService.$inject = ['$rootScope', '$firebaseAuth', '$q', 'Account',
  'LoopBackAuth', 'pawMainConstants'
];

function authService($rootScope, $firebaseAuth, $q, Account, LoopBackAuth,
  pawMainConstants) {
  let auth = $firebaseAuth();

  return {
    checkInitialLogin,
    loginPictograpi,
    loginFacebook,
    logout,
    setLoggedIn,
    setLoggedOut,
    register
  };

  function checkInitialLogin() {
    $firebaseAuth().$onAuthStateChanged(function (user) {
      user ? (loginPictograpi()
          .then(() => setLoggedIn(user))
          .catch(setLoggedOut)) :
        setLoggedOut();
    });
  }

  function loginPictograpi() {
    return Account.login({
      email: process.env.PICTOGRAPI_USER,
      password: process.env.PICTOGRAPI_PASSWORD
    }).$promise;
  }

  /**
   * Logs in a user using Facebook.
   * @returns {Promise} To be resolved when finished.
   */
  function loginFacebook() {
    return $q.all([
      auth.$signInWithPopup('facebook'),
      loginPictograpi()
    ]).then((data) => {
      let firebaseUser = data[0];

      $rootScope.user = firebaseUser;
      $rootScope.isAuth = true;
      $rootScope.$emit(pawMainConstants.EVENTS.USER_LOGGED_IN);
    });
  }

  /**
   * Stores user data on logged in.
   *
   * @param {Object} user User information
   */
  function setLoggedIn(user) {
    $rootScope.isAuth = true;
    $rootScope.user = user;
    $rootScope.$emit(pawMainConstants.EVENTS.USER_LOGGED_IN);
  }

  /**
   * Removes user data on logged out.
   */
  function setLoggedOut() {
    $rootScope.isAuth = false;
    $rootScope.user = undefined;
    $rootScope.$emit(pawMainConstants.EVENTS.USER_LOGGED_OUT);
  }

  /**
   * Logs out a user and removes all related information.
   *
   * @returns {Promise} To be resolved when finished.
   */
  function logout() {
    LoopBackAuth.clearUser();
    LoopBackAuth.clearStorage();
    $rootScope.isAuth = false;

    return auth.$signOut()
      .then(setLoggedOut);
  }

  function register(data) {
    return Account.create(data).$promise;
  }
}
