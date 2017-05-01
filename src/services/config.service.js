export default pawConfigService;

/**
 * Configuration service.
 *
 * @returns {Object} API.
 */
function pawConfigService() {
  let config = {
    isBorderActive: true
  };

  return {
    toggleBorder,
    getBorderActive
  };

  /**
   * Toggles border status.
   */
  function toggleBorder() {
    config.isBorderActive = !config.isBorderActive;
  }

  /**
   * Gets border status.
   */
  function getBorderActive() {
    return config.isBorderActive;
  }
}
