export default authService;

authService.$inject = ['$rootScope', 'Account', 'pawMainConstants'];

function authService($rootScope, Account, pawMainConstants) {
  return {
    login,
    logout
  };

  function login(data) {
    return Account.login({
        email: data.email,
        password: data.password
      }).$promise
      .then(() => {
        $rootScope.isAuth = true;
        $rootScope.$emit(pawMainConstants.EVENTS.USER_LOGGED_IN);
      });
  }

  function logout(data) {
    return Account.logout().$promise
      .then(() => {
        $rootScope.isAuth = false;
        $rootScope.$emit(pawMainConstants.EVENTS.USER_LOGGED_OUT);
      });
  }
}
