import { CHANGE_ACTIVE_LINK } from './types';

const setActiveLink = link => (
  { type: CHANGE_ACTIVE_LINK, payload: link }
);

export { setActiveLink };
