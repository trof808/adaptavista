
const getSortedLinks = state => state.pages.links.sort((a, b) => a.order - b.order);

export { getSortedLinks };
