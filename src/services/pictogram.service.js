export default pictogramService;

pictogramService.$inject = ['Pictogram'];

/**
 * Pictogram service.
 *
 * @param {any} Pictogram
 * @returns {Object} API.
 */
function pictogramService(Pictogram) {
  return {
    get
  };

  /**
   * Filters pictograms by language
   *
   * @param {Array.<Object>} pictograms Obtained from API.
   * @return {Array.<Object>} Pictograms filtered.
   */
  function filterByLanguage(pictograms) {
    return pictograms.filter(pictogram => pictogram.language.code === 'es-ES');
  }

  /**
   * Obtains pictograms for a given term.
   *
   * @param {string} term Term to find pictograms.
   * @returns {Promise} To be resolved with an array of pictograms.
   */
  function get(term) {
    return Pictogram.find({
        filter: {
          where: {
            term: term
          },
          include: ['language', 'type', 'image']
        }
      }).$promise
      .then((pictograms) => filterByLanguage(pictograms));
  }
}
