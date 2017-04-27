export default pawWordService;

pawWordService.$inject = ['$rootScope', 'pawMainConstants', 'Pictogram'];

/**
 * Manager service.
 *
 * @param {any} $rootScope
 * @param {any} pawMainConstants
 * @param {any} Pictogram
 * @returns {Object} API.
 */
function pawWordService($rootScope, pawMainConstants, Pictogram) {
  let words = [];

  return {
    update,
    get
  };

  /**
   * Checks if a given text is new.
   *
   * @param {Array.<string>} newWords New words to check if they are new.
   * @returns True if user has introduced new words.
   */
  function isNew(newWords) {
    return words.toString() !== newWords.toString();
  }

  /**
   * Updates words with new words introduced.
   *
   * @param {Array.<string>} newWords New words to update.
   */
  function setText(newWords) {
    words = newWords;

    notify();
  }

  /**
   * Splits a text into words.
   *
   * @param {string} text Text to split.
   * @returns {Array.<string>} Array of words.
   */
  function splitWords(text) {
    let wordRegExp = /\s+/igm;
    let isChaining = false;

    return text.split(wordRegExp).filter(char => char !== ' ')
      .reduce((acc, word) => {

        if (isChaining) {
          acc[acc.length - 1] += ` ${word}`;
        } else {
          acc.push(word);
        }

        if (word.startsWith('"')) {
          isChaining = true;
        } else if (word.endsWith('"')) {
          isChaining = false;
        }

        return acc;
      }, []);
  }

  /**
   * Emits an event informing a new pictogram has been loaded.
   */
  function notify() {
    $rootScope.$emit(pawMainConstants.EVENTS.NEW_WORD_INSERTED);
  }

  /**
   * Obtains all pictograms stored.
   *
   * @public
   * @returns {Array.<Object>} Pictograms stored.
   */
  function get() {
    return words;
  }

  /**
   * Updates words stored with new words introduced in the input.
   *
   * @public
   * @param {string} newText New text introduced in the input by the user.
   */
  function update(newText) {
    let newWords = splitWords(newText);

    if (isNew(newWords)) {
      setText(newWords);
    }
  }
}
