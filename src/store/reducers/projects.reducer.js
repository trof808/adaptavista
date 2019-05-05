import {
  SET_FIRST_PAGE_INFO, SET_CHOOSED_RELEASE, SET_CHOOSED_CYCLE,
  SET_RELEASES_INFO, SET_PROJECT_FETCHING, SET_CYCLES, SET_RELEASE_FETCHING,
  SET_CYCLE_TYPES, SET_TEAMS, SET_ALL_TEAMS_FETCHING, CHANGE_ACTIVE_SPRINT,
  SET_PROJECT_SPRINT_STAT, SET_SHOW_SPRINT_INFO, SET_TEAMS_CYCLE_STATS
} from '../actions/types';

const projectInfo = {
  isFetching: true,
  isFetchingRelease: false,
  isFetchingTeams: false,
  isFetchingUsers: false,
  progressByWeek: 0,
  automated: 0,
  total: 0,
  last: 0,
  automatedPercent: 0,
  totalFailedRuns: 0,
  totalNotExecutedRuns: 0,
  totalPassedRuns: 0,
  totalRuns: 0,
  totalInProgressRuns: 0,
  releases: [],
  cycleTypes: [],
  teams: [],
  sprintsStat: [],
  teamCycleStat: [],
  activeSprint: {
    id: 0,
    active: false
  }
};

const initialState = {
  DCB: {
    id: 'sbbol',
    key: 'DCB',
    name: 'СББОЛ',
    showForSprint: true,
    showForRelease: true,
    releaseBlockActive: true,
    ...projectInfo
  },
  IOS: {
    id: 'ios',
    key: 'IOS',
    name: 'IOS',
    showForSprint: true,
    showForRelease: false,
    ...projectInfo
  },
  ANDROID: {
    id: 'android',
    key: 'ANDROID',
    name: 'Android',
    showForSprint: true,
    showForRelease: false,
    ...projectInfo
  },
  WINDOWS: {
    id: 'windows',
    key: 'WINDOWS',
    name: 'Windows',
    showForSprint: true,
    showForRelease: false,
    ...projectInfo
  },
  SBB: {
    id: 'sbb',
    key: 'SBB',
    name: 'СББ',
    showForSprint: true,
    showForRelease: true,
    releaseBlockActive: false,
    ...projectInfo
  },
  FINTECH: {
    id: 'fintech',
    key: 'FINTECH',
    name: 'FINTECH',
    showForSprint: true,
    showForRelease: false,
    releaseBlockActive: false,
    ...projectInfo
  }
};

function projects(state = initialState, { type, payload }) {
  switch (type) {
    case SET_PROJECT_FETCHING:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          isFetching: payload.flag
        }
      };
    case SET_RELEASE_FETCHING:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          isFetchingRelease: payload.flag
        }
      };
    case SET_TEAMS_CYCLE_STATS:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          teamCycleStat: payload.stats
        }
      };
    case SET_PROJECT_SPRINT_STAT:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          sprintsStat: payload.stat.sort((a, b) => a.sprint.id - b.sprint.id).map(s => ({
            ...s,
            sprint: {
              ...s.sprint,
              startDate: new Date(s.sprint.startDate).toLocaleDateString('ru-RU'),
              endDate: new Date(s.sprint.endDate).toLocaleDateString('ru-RU'),
            },
            show: false
          }))
        }
      };
    case SET_FIRST_PAGE_INFO:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          progressByWeek: parseInt(payload.info.progressByWeek, 10),
          automated: payload.info.automated,
          total: payload.info.total,
          last: payload.info.last,
          automatedPercent: (payload.info.automated / payload.info.total * 100).toFixed(1),
          totalFailedRuns: payload.info.totalFailedRuns,
          totalNotExecutedRuns: payload.info.totalNotExecutedRuns,
          totalPassedRuns: payload.info.totalPassedRuns,
          totalInProgressRuns: payload.info.totalInProgressRuns,
          totalRuns: payload.info.totalRuns,
        }
      };
    case SET_RELEASES_INFO:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          releases: payload.releases
        }
      };
    case SET_CHOOSED_RELEASE:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          releases: state[payload.projectKey].releases.map(r => (r.name === payload.releaseName
            ? Object.assign(r, { active: true }) : Object.assign(r, { active: false })))
        }
      };
    case SET_CHOOSED_CYCLE:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          releases: state[payload.projectKey].releases.map(r => {
            if (r.name === payload.releaseName) {
              return {
                ...r,
                cycles: r.cycles.map(c => (parseInt(c.cyleNum, 10) === parseInt(payload.cycleNum, 10)
                  ? { ...c, active: true } : { ...c, active: false }))
              };
            }
            return r;
          })
        }
      };
    case SET_CYCLES:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          releases: state[payload.projectKey].releases.map(r => {
            if (r.name === payload.releaseName) {
              return {
                ...r,
                cycles: payload.cycles.sort((a, b) => a.cyleNum - b.cyleNum)
              };
            }
            return r;
          })
        }
      };
    case SET_CYCLE_TYPES:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          cycleTypes: payload.cycleTypes
        }
      };
    case SET_TEAMS:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          teams: payload.teams
        }
      };
    case CHANGE_ACTIVE_SPRINT:
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          activeSprint: {
            id: payload.sprintNum,
            active: true
          }
        }
      };
    case SET_SHOW_SPRINT_INFO:
      if (payload.sprintId === null) {
        return {
          ...state,
          [payload.projectKey]: {
            ...state[payload.projectKey],
            sprintsStat: state[payload.projectKey].sprintsStat.map(s => ({ ...s, show: false }))
          }
        };
      }
      return {
        ...state,
        [payload.projectKey]: {
          ...state[payload.projectKey],
          sprintsStat: state[payload.projectKey].sprintsStat.map(s => {
            if (s.sprint.id === payload.sprintId) {
              return { ...s, show: payload.flag };
            }
            return { ...s, show: false };
          })
        }
      };
    case SET_ALL_TEAMS_FETCHING:
      return {
        ...state,
        DCB: {
          ...state.DCB,
          isFetching: payload.flag
        },
        IOS: {
          ...state.IOS,
          isFetching: payload.flag
        },
        ANDROID: {
          ...state.ANDROID,
          isFetching: payload.flag
        },
        WINDOWS: {
          ...state.WINDOWS,
          isFetching: payload.flag
        },
        SBB: {
          ...state.SBB,
          isFetching: payload.flag
        },
        SBK: {
          ...state.SBK,
          isFetching: payload.flag
        },
        FINTECH: {
          ...state.FINTECH,
          isFetching: payload.flag
        }
      };
    default:
      return state;
  }
}

export default projects;
