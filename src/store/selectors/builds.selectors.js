/**
 * Получить релизные ветки для селекта
 *
 * @param {object} state
 */
export const getReleases = state => state.buildsStore.releases.map(release => release.name);

/**
 * Получить список билдов из стора
 *
 * @param {object} state
 */
export const getBuilds = state => state.buildsStore.builds;

/**
 * Получить список билдов (номер / дата)
 *
 * @param {object} state
 */
export const getBuildsNumsAndDates = state => {
  const builds = getBuilds(state);
  return builds.map(build => `${build.buildNum} / ${build.startDate}`);
};

/**
 * Получить билд по его номеру
 *
 * @param {object} state
 * @param {Number | String} num - номер билда
 */
export const getBuildByNum = (state, num) => {
  const builds = getBuilds(state);
  return builds.find(build => parseInt(build.buildNum, 10) === parseInt(num, 10));
};

/**
 * Получить значение первого селекта (номер / дата)
 *
 * @param {object} state
 */
export const getFirstSelectActiveValue = state => {
  const build = state.buildsStore.firstChoosedBuild;
  return build ? { ...build, parsedValue: `${build.buildNum} / ${build.startDate}` } : null;
};

/**
 * Получить значение второго селекта (номер / дата)
 *
 * @param {object} state
 */
export const getSecondSelectActiveValue = state => {
  const build = state.buildsStore.secondChoosedBuild;
  return build ? { ...build, parsedValue: `${build.buildNum} / ${build.startDate}` } : null;
};

/**
 * Получить статус загрузки
 *
 * @param {object} state
 */
export const getIsFetchingStatus = state => state.buildsStore.isFetching;

/**
 * Получить список тестов
 *
 * @param {object} state
 */
export const getTests = state => state.buildsStore.tests;

/**
 * Получить список отфильтрованных тестов
 *
 * @param {object} state
 */
export const getFilteredTests = state => {
  const {
    showSuccess, showFailed, search, activePr, sortKeys
  } = state.buildsStore.filters;
  const { tests } = state.buildsStore;

  const sortTestByKey = (a, b) => {
    if (sortKeys) {
      if (a.key < b.key) { return -1; }
      if (a.key > b.key) { return 1; }
    } else {
      if (a.key > b.key) { return -1; }
      if (a.key < b.key) { return 1; }
    }
    return 0;
  };

  if (!showFailed && showSuccess) {
    return tests
      .filter(test => test.status === 'passed'
                      && test.key.toLowerCase().indexOf(search.toLowerCase()) !== -1
                      && (activePr ? test.prList.includes(activePr) : true))
      .sort(sortTestByKey);
  }
  if (!showSuccess && showFailed) {
    return tests
      .filter(test => test.status === 'failed'
                      && test.key.toLowerCase().indexOf(search.toLowerCase()) !== -1
                      && (activePr ? test.prList.includes(activePr) : true))
      .sort(sortTestByKey);
  }
  if (search !== '') {
    return tests
      .filter(test => test.key.toLowerCase().indexOf(search.toLowerCase()) !== -1
                      && (activePr ? test.prList.includes(activePr) : true))
      .sort(sortTestByKey);
  }
  if (activePr) {
    return tests.filter(test => test.prList.includes(activePr)).sort(sortTestByKey);
  }
  return tests.sort(sortTestByKey);
};

/**
 * Получить фильтры
 *
 * @param {object} state
 */
export const getFilters = state => state.buildsStore.filters;

/**
 * Получить список пул реквестов
 *
 * @param {object} state
 */
export const getPullRequestsList = state => {
  const { tests } = state.buildsStore;
  return state.buildsStore.prs.map(pr => pr.prId).filter(pr => tests.find(test => test.prList.includes(pr)));
};
