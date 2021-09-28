import getSurveys from '../get-surveys';

beforeAll(() => jest.spyOn(window, 'fetch'));

const response = [{ title: 'survey-1', id: '12345' }, { name: 'survey-2', id: '23456'}, { title: 'survey-3' }];

test('should return valid survey objects when called with a token', async () => {
  window.fetch.mockResolvedValueOnce({ ok: true, json: async () => (response) })
  const surveys = await getSurveys('abc');

  expect(window.fetch).toHaveBeenCalledWith(
    'http://localhost:8080/api/surveys',
    { headers: { authorization: 'abc' } }
  );
  expect(surveys).toStrictEqual([ response[0] ])
});

const invalidResponse = { title: 'survey-4', id: '34567' };

test('should return an empty array when the response is an unexpected format', async () => {
  window.fetch.mockResolvedValueOnce({ ok: true, json: async () => (invalidResponse) })
  const surveys = await getSurveys('abc');

  expect(window.fetch).toHaveBeenCalledWith(
    'http://localhost:8080/api/surveys',
    { headers: { authorization: 'abc' } }
  );
  expect(surveys).toStrictEqual([]);
});

test('should return an empty array when the response isnt successful', async () => {
  window.fetch.mockResolvedValueOnce({ ok: false })
  const surveys = await getSurveys('abc');

  expect(window.fetch).toHaveBeenCalledWith(
    'http://localhost:8080/api/surveys',
    { headers: { authorization: 'abc' } }
  );
  expect(surveys).toStrictEqual([]);
});

