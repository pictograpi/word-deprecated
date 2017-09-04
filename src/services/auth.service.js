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
    setLoggedOut
  };

  /**
   * Launches login into the API and stores information in the $rootScope.
   */
  function checkInitialLogin() {
    loginPictograpi().then(setLoggedIn);
  }

  /**
   * Requests a login petition to the API.
   *
   * @returns {Promise} To be resolved when finished.
   */
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
  function setLoggedIn() {
    $rootScope.isAuth = true;
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
}