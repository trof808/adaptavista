
/**
* Получить список тестов из битбакета
*/
export const getBitbucketTests = state => state.bitbucketTests.tests;

/**
* Получить статус загрузки тестов
*/
export const getFetchingStatus = state => state.bitbucketTests.isFetching;

export const getTotalElements = state => state.bitbucketTests.totalElements || 0;
