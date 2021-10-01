import getSurveyDetails from '../get-survey-details';

beforeAll(() => jest.spyOn(window, 'fetch'));

const response = { surveyId: '12345', name: 'Week 1 Bootcamp Survey - Scotland', questionCount: 2, questions: [] };

test('should return valid survey objects when called with a token', async () => {
  window.fetch.mockResolvedValueOnce({ ok: true, json: async () => (response) })
  const surveys = await getSurveyDetails('abc', '12345');

  expect(window.fetch).toHaveBeenCalledWith(
    'http://localhost:8080/api/survey-details/12345',
    { headers: { authorization: 'Bearer abc' } }
  );
  expect(surveys).toStrictEqual(response)
});

test('should return an empty object when the response isnt successful', async () => {
  window.fetch.mockResolvedValueOnce({ ok: false })
  const surveys = await getSurveyDetails('abc', '23456');

  expect(window.fetch).toHaveBeenCalledWith(
    'http://localhost:8080/api/survey-details/23456',
    { headers: { authorization: 'Bearer abc' } }
  );
  expect(surveys).toStrictEqual(null);
});
