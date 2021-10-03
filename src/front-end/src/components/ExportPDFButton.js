import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import pic from "../pdf-page-1.png"

const StyledExportPDFButton = styled.div`
  background-color: var(--primaryBlueColor);
  color: var(--primaryWhiteColor);
  font-weight: 700;
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 3px;
  margin-top: auto;
  margin-bottom: 10px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    cursor: pointer;
  }
`;

const styles = StyleSheet.create({
  page: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      width: '100%',
      orientation: 'portrait',
  },
  view: {
      width: '100%',
      height: '100%',
      padding: 0,
      backgroundColor: 'white',
  },
  image: {
      objectFit: 'cover',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
});

const MyDocument = ({ survey }) => {
  return (
    <>
    <Document>
    <Page object-fit="fill" style={styles.page} size="A4">
      <View style={styles.view}>
        <Image style={styles.image}  src={pic} alt="images" />
      </View>
    </Page>
    <Page object-fit="fill" style={styles.page} size="A4">
    {console.log(survey)}
    <View style={styles.view}>
        {survey?.questions.map((question, index) => {
          return (
              <Text key={index}>
                {"Question " + (index + 1) + ". " + question.questionName}
                {"\n"}
                {question.answers.map((answer, index) => {
                    return <Text key={index}>{"\n\n"}{"Response " + (index + 1) + ". "}{answer.text}{answer.text && answer.score ? " - " : ""}{answer.score}</Text>
                  })
                }
                {"\n\n"}
              </Text>
          )
        })}
    </View>
    </Page>
  </Document>
  </>
  )
};

export const ExportPDFButton = React.memo(({survey}) => {
  return (
    <PDFDownloadLink document={<MyDocument survey={survey}/>} fileName={survey.name}>
       {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Export PDF')}
     </PDFDownloadLink>
  )
})

export default ExportPDFButton;