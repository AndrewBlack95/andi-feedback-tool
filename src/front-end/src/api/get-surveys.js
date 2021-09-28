const mockGetSurveysResponse = [
  { title: 'Week 1 Bootcamp Survey - Scotland', id: '12345' },
  { title: 'Week 1 Bootcamp Survey - The North', id: '12345' },
  { title: 'Week 1 Bootcamp Survey - The South', id: '12345' },
  { title: 'Week 2 Bootcamp Survey - Scotland', id: '12345' },
  { title: 'Week 2 Bootcamp Survey - The North', id: '12345' },
  { title: 'Week 2 Bootcamp Survey - The South', id: '12345' },
  { title: 'Week 3 Bootcamp Survey - Scotland', id: '12345' },
  { title: 'Week 3 Bootcamp Survey - The North', id: '12345' },
  { title: 'Week 3 Bootcamp Survey - The South', id: '12345' },
  { title: 'Week 4 Bootcamp Survey - Scotland', id: '12345' },
  { title: 'Week 4 Bootcamp Survey - The North', id: '12345' },
  { title: 'Week 4 Bootcamp Survey - The South', id: '12345' },
];

const validateResponse = (data = []) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.filter(item => item.title && item.id);
};

const getSurveys = (token) => {
  return fetch('http://localhost:8080/api/surveys', { headers: { authorization: token } })
    .then(response => response.json())
    .then(data => validateResponse(data))
    .catch(e => validateResponse(mockGetSurveysResponse))
};

export default getSurveys;
