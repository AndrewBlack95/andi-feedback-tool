// To be removed - useful for manual testing replace null in catch block with - new Promise(resolve => setTimeout(() => resolve(transform(mockGetSurveyDetailsResponse)), 3000))
// const mockGetSurveyDetailsResponse = {
//   surveyId: '12345',
//   name: 'Week 1 Bootcamp Survey - Scotland',
//   questionCount: 2,
//   questions: [
//     { questionName: 'How good is Onboarding?', answers: [{ responseId: 'abcde_12345', value: '2/5', type: 'SCORE'}] },
//     { questionName: 'Did you enjoy Club day?', answers: [
//       { responseId: 'abcde_12345', value: 'Yes, it was absolutely great!', type: 'TEXT'}, 
//       { responseId: 'abcde_12345', value: '5/5', type: 'SCORE'}, 
//       { responseId: 'tada', value: '1/5', type: 'SCORE'},
//       { responseId: 'tada1', value: '3/5', type: 'SCORE'},
//       { responseId: 'tada2', value: '2/5', type: 'SCORE'},
//       { responseId: 'tada3', value: '5/5', type: 'SCORE'},
//       { responseId: 'tada4', value: '5/5', type: 'SCORE'},
//       { responseId: 'tada5', value: '4/5', type: 'SCORE'},
//       { responseId: 'tada6', value: '0/5', type: 'SCORE'},
//       { responseId: 'tada7', value: '1/5', type: 'SCORE'},
//       { responseId: 'tada8', value: '4/5', type: 'SCORE'},
//       { responseId: 'tada9', value: '2/5', type: 'SCORE'},
//       { responseId: 'tada0', value: '3/5', type: 'SCORE'},
//       { responseId: 'tadaa', value: '1/5', type: 'SCORE'},
//       { responseId: 'tadab', value: '5/5', type: 'SCORE'},
//       { responseId: 'tada4', value: 'Thought it was brilliant!', type: 'TEXT'},
//     ] },
//     { questionName: 'What did you think of Client Fundamentals?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
//     { questionName: 'What did you think of PD Fundamentals?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
//     { questionName: 'What did you think of PA Fundamentals?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
//     { questionName: 'What did you think of the Scrum session?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
//     { questionName: 'What did you think of the socials?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
//     { questionName: 'Overall how would you rate the onboarding experience?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
//     { questionName: 'Did you feel that you were provided with the support you needed?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
//     { questionName: 'Would you recommend AND Digital?', answers: [{ responseId: 'abcde_12345', value: 'Yes', type: 'TEXT'}] },
//   ]
// }

const combineAnswers = (answers = []) => {
  return answers.reduce((transformedAnswers, answer) => {
    const index = transformedAnswers.findIndex((ans) => ans.responseId === answer.responseId);

    if (index >= 0) {
      if (answer.type === 'TEXT') {
        transformedAnswers[index].text = answer.value;
      }
      if (answer.type === 'SCORE') {
        transformedAnswers[index].score = answer.value;
      }
    } else {
      transformedAnswers.push({ 
        responseId: answer.responseId, 
        text: answer.type === 'TEXT' ? answer.value : null, 
        score: answer.type === 'SCORE' ? answer.value : null
      });
    }
    return transformedAnswers;
  }, []);
}

const transform = (data = {}) => {
 const { surveyId, name, questionCount, questions = [] } = data;
 return {
   surveyId,
   name,
   questionCount,
   questions: questions.map(question => {
     const { questionName, answers = [] } = question;
     return { questionName, answers: combineAnswers(answers) }
   })
 }
}

const getSurveyDetails = (token, surveyId = '') => {
  return fetch(`http://localhost:8080/api/survey-details/${surveyId}`, { headers: { authorization: token } })
    .then(response => response.json())
    .then(data => transform(data))
    .catch(e => null)
};

export default getSurveyDetails;
