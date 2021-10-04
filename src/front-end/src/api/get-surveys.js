const validateResponse = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.filter(item => item.title && item.id);
};

const getSurveys = (token) => {
  return fetch('http://localhost:8080/api/surveys', { headers: { authorization: `Bearer ${token}` } })
    .then(response => response.json())
    .then(data => validateResponse(data))
    .catch(e => [])
};

export default getSurveys;
