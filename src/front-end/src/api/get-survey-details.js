// To be removed - useful for manual testing (replace empty array in catch block with this array)
const mockGetSurveyDetailsResponse = {
  surveyId: '12345',
  name: 'Week 1 Bootcamp Survey - Scotland',
  questionCount: 2,
  questions: [
    { questionName: 'How good is Onboarding?', answers: [{ responseId: 'abcde_12345', value: 'Great', type: 'TEXT'}] },
    { questionName: 'Did you enjoy Club day?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}, { responseId: 'abcde_12345', value: 'Fantastic', type: 'TEXT'}] },
    { questionName: 'What did you think of Client Fundamentals?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
    { questionName: 'What did you think of PD Fundamentals?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
    { questionName: 'What did you think of PA Fundamentals?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
    { questionName: 'What did you think of the Scrum session?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
    { questionName: 'What did you think of the socials?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
    { questionName: 'Overall how would you rate the onboarding experience?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
    { questionName: 'Did you feel that you were provided with the support you needed?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
    { questionName: 'Would you recommend AND Digital?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
  ]
}

const validateResponse = (data) => {
  return data;
  // if (!Array.isArray(data)) {
  //   return [];
  // }
  // return data.filter(item => item.title && item.id);
};

const getSurveyDetails = (token, surveyId) => {
  return fetch(`http://localhost:8080/api/questions/${surveyId}`, { headers: { authorization: token } })
    .then(response => response.json())
    .then(data => validateResponse(data))
    .catch(e => mockGetSurveyDetailsResponse)
};

export default getSurveyDetails;
