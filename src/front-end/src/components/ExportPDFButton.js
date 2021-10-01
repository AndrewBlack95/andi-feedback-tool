import { useEffect, useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import pic from "../pdf-page-1.png"
import Questions from './Questions';

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

const MyDocument = ({survey}) => {
  setTimeout(() => {
    <Document>
      <Page size="B1" style={styles.page}>
          <View style={styles.section}>
            {
              survey?.questions?.map((question, index) => (<Text key={index}>{question.questionName}</Text>))
            }
          </View>
      </Page>
    </Document>
}, 1)
};

const ExportPDFButton = ({survey, tags}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setOpen(true);
    return () => setOpen(false);
  });

  return (
    <>
      {open && (
        <PDFDownloadLink document={<MyDocument survey={survey}/>} fileName={survey?.name}>
          {({ blob, url, loading, error }) =>
            loading ? 'Loading PDF...' : 'Export PDF'
          }
        </PDFDownloadLink>
      )}
    </>
  );

};

export default ExportPDFButton;