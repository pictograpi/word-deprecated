export default pictographService;

pictographService.$inject = ['Pictograph'];

/**
 * Pictograph service.
 *
 * @param {any} Pictograph
 * @returns {Object} API.
 */
function pictographService(Pictograph) {
  return {
    get
  };

  /**
   * Filters pictographs by language
   *
   * @param {Array.<Object>} pictographs Obtained from API.
   * @return {Array.<Object>} Pictographs filtered.
   */
  function filterByLanguage(pictographs) {
    return pictographs.filter(pictograph => pictograph.language.code === 'es-ES');
  }

  /**
   * Obtains pictographs for a given term.
   *
   * @param {string} term Term to find pictographs.
   * @returns {Promise} To be resolved with an array of pictographs.
   */
  function get(term) {
    return Pictograph.find({
      filter: {
        where: {
          term: term
        },
        include: ['language', 'type', 'image']
      }
    }).$promise.then((pictographs) => filterByLanguage(pictographs));
  }
}