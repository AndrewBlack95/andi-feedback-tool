const transformOpenEnded = (responses) => {
  return responses.map(responseForPerson => {
    return { text: responseForPerson[0]?.value, score: null }
  });
};

const transformSingleChoice = (responses) => {
  return responses.map(responseForPerson => {
    if (responseForPerson[0]?.score === 0) {
      return { text: responseForPerson[0]?.value, score: null }
    } else {
      return { text: null, score: responseForPerson[0]?.score }
    }
  });
};

const transformMultipleChoice = (responses) => {
  return responses.map(responseForPerson => {
    return {
      text: [ ...new Set(responseForPerson.map(response => response.value)) ].join(', '),
      score: null
    }
  });
};

const formatQuestionTitle = (title) => {
  const lineBreaks = /<br>/g;
  const endLineBreaks = /<\/?br ?\/?>/g;
  const htmlTags = /<.*?>/g;
  return title.replace(lineBreaks, '').replace(endLineBreaks, '. ').replace(htmlTags, '');
};

const questionContainsName = (title) => {
  const name = /name/gi;
  return title.match(name)
};

const transform = (data = {}) => {
 const { surveyId, name, questionCount, questions = [] } = data;

 if (!surveyId || !name) {
   throw new Error('Unexpected response format', { cause: data });
 };
 
 return {
   surveyId,
   name,
   questionCount,
   questions: questions.reduce((acc, question, index) => {
    const { title, questionType, responses = [] } = question;

    const questionName = formatQuestionTitle(title);

    if (questionContainsName(questionName)) {
      return acc;
    }

    if (questionType === 'OPEN_ENDED') {
      acc.push({ questionName, answers: transformOpenEnded(responses) });
    }

    if (questionType === 'SINGLE_CHOICE') {
      acc.push({ questionName, answers: transformSingleChoice(responses) });
    }
    
    if (questionType === 'MULTIPLE_CHOICE') {
      acc.push({ questionName, answers: transformMultipleChoice(responses) });
    }

    return acc;
   }, [])
 }
};

const getSurveyDetails = (token, surveyId = '') => {
  return fetch(`http://localhost:8080/api/survey-details/${surveyId}`, { headers: { authorization: `Bearer ${token}` } })
    .then(response => response.json())
    .then(data => transform(data))
    .catch(e => null)
};

export default getSurveyDetails;
