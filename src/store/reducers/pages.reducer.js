import { CHANGE_ACTIVE_LINK } from '../actions/types';

const initialState = {
  links: [
    {
      link: '/test/runs-status',
      title: 'Изменение состояния тестов',
      show: true,
      active: false,
      order: 1
    },
    {
      link: '/test/state',
      title: 'Статус тестов',
      show: true,
      active: false,
      order: 2
    },
    {
      link: '/',
      title: 'Статус автоматизации',
      show: true,
      active: false,
      order: 0
    },
  ]
};

function pages(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_ACTIVE_LINK:
      return {
        ...state,
        links: state.links.map(link => ({
          ...link,
          active: link.link === payload
        }))
      };
    default:
      return state;
  }
}

export default pages;
