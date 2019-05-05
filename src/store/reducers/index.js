import { combineReducers } from 'redux';
import globalStore from './global.reducer';
import projects from './projects.reducer';
import pages from './pages.reducer';
import bitbucketTests from './tests.reducer';
import buildsStore from './builds.reducer';

export const rootReducer = combineReducers({
  globalStore,
  projects,
  pages,
  bitbucketTests,
  buildsStore
});
