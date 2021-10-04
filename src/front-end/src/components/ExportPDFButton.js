import React from 'react';
import { Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import pic from "../pdf-page-1.png"

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
  title: {
    fontSize: 36,
    textAlign: 'center'
  },
  text: {
    fontSize: 12,
    textAlign: 'left'
  }
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
    {survey?.questions.map((question, index) => {
      return (
        <Page object-fit="fill" style={styles.page} size="A4">
          <View style={styles.view}>
            <Text key={index} style={styles.title}>
              {"Question " + (index + 1) + ". " + question.questionName}
              {question.answers.map((answer, index) => {
                  return <Text style={styles.text} key={index}>{"\n\n"}{"Response " + (index + 1) + ". "}{answer.text}{answer.text && answer.score ? " - " : ""}{answer.score}</Text>
                })
              }
              {"\n\n"}
            </Text>
          </View>
        </Page>
      )
    })}
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