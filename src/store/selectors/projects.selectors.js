/**
 * Получить массив проектов
 */
export const getProjectsArray = state => Object.values(state.projects);

/**
 * Получить массив ключей проектов
 */
export const getProjectsKeysList = state => {
  const projects = getProjectsArray(state);
  return projects.map(p => p.key);
};

/**
 * Получить проект по ключу
 */
export const getProjectByKey = (state, projectKey) => Object.values(state.projects).find(p => p.key === projectKey);

/**
 * Статус загрузки карточки проекта
 */
export const getProjectIsFetching = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.isFetching : false;
};

/**
 * Статус загрузки статистики каманд
 */
export const teamsIsFetching = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.isFetchingTeams : false;
};

/**
 * Статистика выбранного прогона по командам
 */
export const teamsCycleStats = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.teamCycleStat : [];
};

/**
 * Статус автоматизации
 */
export const getAutomated = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.automated : 0;
};

/**
 * Все тесты
 */
export const getTotal = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.total : 0;
};

/**
 * Осталось неавтоматизированных тестов
 */
export const getLast = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.last : 0;
};

/**
 * получить статус выполненных автоматизированных тестов в последнем прогоне
 */
export const getAutoRunPassed = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.totalPassedRuns : 0;
};

/**
 * получить все автоматизированные тесты в последнем прогоне
 */
export const getAutoRunTotal = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.totalRuns : 0;
};

/**
 * получить все автоматизированные зафэйленные тесты в последнем прогоне
 */
export const getAutoRunFailed = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.totalFailedRuns : 0;
};

/**
 * получить все автоматизированные не запущенные тесты в последнем прогоне
 */
export const getAutoRunNotExecuted = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.totalNotExecutedRuns : 0;
};

/**
 * получить список релизов
 */
export const getReleases = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null && findProject.releases
    ? findProject.releases.map(r => r.name)
    : [];
};

/**
 * получить последний релиз
 */
export const getLastRelease = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null && findProject.releases
    ? findProject.releases[findProject.releases.length - 1]
    : null;
};

/**
 * получить активный релиз
 */
export const getActiveRelease = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  const release = findProject !== null && findProject.releases
    ? findProject.releases.find(r => r.active)
    : null;
  return release;
};

/**
 * получить название активного релиза
 */
export const getActiveReleaseName = (state, projectKey) => {
  const release = getActiveRelease(state, projectKey);
  return release ? release.name : '';
};

/**
 * получить список циклов выбранного релиза
 */
export const getCyclesName = (state, projectKey) => {
  const activeRelease = getActiveRelease(state, projectKey);
  return activeRelease && activeRelease.cycles
    ? activeRelease.cycles.map(c => c.cyleNum)
    : [];
};

/**
 * получить выбранные цикл
 */
export const getActiveCycle = (state, projectKey) => {
  const activeRelease = getActiveRelease(state, projectKey);
  return activeRelease && activeRelease.cycles
    ? activeRelease.cycles.find(c => c.active)
    : null;
};

/**
 * получить номер выбранного цикла
 */
export const getActiveCycleNum = (state, projectKey) => {
  const activeCycle = getActiveCycle(state, projectKey);
  return activeCycle ? activeCycle.cyleNum : '';
};

/**
 * получить статус загрузки прогонов
 */
export const getReleaseIsFetching = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject ? findProject.isFetchingRelease : false;
};

/**
 * получить информацию по ифт
 */
export const getIftInfo = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  const info = findProject && findProject.cycleTypes
    ? findProject.cycleTypes.find(c => c.cycleType === 'IFT')
    : null;
  return info || null;
};

/**
 * получить информацию по регрессу
 */
export const getRegressInfo = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  const info = findProject && findProject.cycleTypes
    ? findProject.cycleTypes.find(c => c.cycleType === 'Regress')
    : null;
  return info || null;
};

/**
 * получить все тесты по регрессу
 */
export const getRegressTotal = (state, projectKey) => {
  const info = getRegressInfo(state, projectKey);
  return info ? info.totalTests : 0;
};

/**
 * получить успешные тесты по регрессу
 */
export const getRegressPassed = (state, projectKey) => {
  const info = getRegressInfo(state, projectKey);
  return info ? info.totalPassed : 0;
};

/**
 * получить зафэйленные тесты по регрессу
 */
export const getRegressFailed = (state, projectKey) => {
  const info = getRegressInfo(state, projectKey);
  return info ? info.totalFailed : 0;
};

/**
 * получить не запущенные тесты по регрессу
 */
export const getRegressLast = (state, projectKey) => {
  const info = getRegressInfo(state, projectKey);
  return info ? info.totalNotExecuted : 0;
};

/**
 * получить тесты в стутусе in progress по регрессу
 */
export const getRegressInProgress = (state, projectKey) => {
  const info = getRegressInfo(state, projectKey);
  return info ? info.totalInProgress : 0;
};

/**
 * получить пройденные тесты по ругрессу
 */
export const getRegressFinished = (state, projectKey) => {
  const info = getRegressInfo(state, projectKey);
  return info ? info.totalTests - info.totalNotExecuted : 0;
};

/**
 * получить все тесты по ифт
 */
export const getIftTotal = (state, projectKey) => {
  const info = getIftInfo(state, projectKey);
  return info ? info.totalTests : 0;
};

/**
 * получить успешные тесты по ифт
 */
export const getIftPassed = (state, projectKey) => {
  const info = getIftInfo(state, projectKey);
  return info ? info.totalPassed : 0;
};

/**
 * получить зафэйленные тесты по ифт
 */
export const getIftFailed = (state, projectKey) => {
  const info = getIftInfo(state, projectKey);
  return info ? info.totalFailed : 0;
};

/**
 * получить оставшиеся тесты по ифт
 */
export const getIftLast = (state, projectKey) => {
  const info = getIftInfo(state, projectKey);
  return info ? info.totalNotExecuted : 0;
};

/**
 * получить тесты в стутусе in progress по ифт
 */
export const getIftProgress = (state, projectKey) => {
  const info = getIftInfo(state, projectKey);
  return info ? info.totalInProgress : 0;
};

/**
 * получить пройденные тесты по ифт
 */
export const getIftFinished = (state, projectKey) => {
  const info = getIftInfo(state, projectKey);
  return info ? info.totalTests - info.totalNotExecuted : 0;
};

/**
 * получить список команд
 */
export const getTeams = (state, projectKey) => {
  const findProject = getProjectByKey(state, projectKey);
  return findProject !== null ? findProject.teams : [];
};

export const findActiveSprint = (state, projectKey) => {
  const project = getProjectByKey(state, projectKey);
  const sprint = project ? project.sprintsStat.find(s => s.sprint.id === project.activeSprint.id) : null;
  return sprint;
};

export const getActiveSprintId = (state, projectKey) => {
  const activeSprint = findActiveSprint(state, projectKey);
  return activeSprint ? activeSprint.id : 1;
};

export const getSprintShowStatus = (state, projectKey) => {
  const sprint = findActiveSprint(state, projectKey);
  return sprint ? sprint.show : false;
};
