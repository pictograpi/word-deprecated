export default pawConfigService;

/**
 * Configuration service.
 *
 * @returns {Object} API.
 */
function pawConfigService() {
  let config = {
    isBorderActive: true,
    isWordActive: true
  };

  return {
    toggleBorder,
    getBorderActive,
    getWordActive,
    toggleWord
  };

  /**
   * Gets word status.
   *
   * @returns {boolean} Word status.
   */
  function getWordActive() {
    return config.isWordActive;
  }

  /**
   * Gets border status.
   *
   * @returns {boolean} Border status.
   */
  function getBorderActive() {
    return config.isBorderActive;
  }

  /**
   * Toggles border status.
   */
  function toggleBorder() {
    config.isBorderActive = !config.isBorderActive;
  }

  /**
   * Toggles word show/hide.
   */
  function toggleWord() {
    config.isWordActive = !config.isWordActive;
  }
}
