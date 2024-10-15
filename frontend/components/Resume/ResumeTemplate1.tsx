import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeType } from '@/types/ResumeType';
import { parseHtmlToText } from '@/util/parseHtmlToText';

Font.register({
  family: 'Tinos',
  src: 'http://fonts.gstatic.com/s/tinos/v9/EqpUbkVmutfwZ0PjpoGwCg.ttf'
});

const styles = StyleSheet.create({
  page: {
    paddingBottom: 20,
    fontFamily: 'Tinos'
  },
  header: {
    padding:'0 30',
    fontSize: 20,
    borderBottom: '1px solid grey',
    marginBottom: 10
  },
  section: {
    marginBottom: 10,
    padding: 5,
  },
  username: {
    fontSize: 24,
    padding: 10,
    fontWeight: 700,
    textAlign: 'center',
    backgroundColor: '#345',
    color: 'white'
  },
  contact: {
    flexDirection: 'row',
    borderBottom: '1px',
    padding: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
    backgroundColor: '#345',
    color: 'white'
  },
  contactInfo: {
    fontSize: 12,
    paddingRight: 10,
  },
  subheader: {
    padding: '0 30',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    padding: '0 30',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'justify'
  },
  listItem: {
    display: 'flex',
    padding: '10 20',
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 2,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    fontSize: 12,
    marginRight: 5,
  },
});

export default function ResumeTemplate1(resume: ResumeType) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.username}>{resume.aboutMe?.name}</Text>
        <View style={styles.contact}>
          <Text style={styles.contactInfo}>{resume.contact?.phoneNo}</Text>
          <Text style={styles.contactInfo}>{resume.contact?.emailId} </Text>
          <Text style={styles.contactInfo}>{resume.contact?.address}</Text>
        </View>
        <Text style={styles.text}>
          {parseHtmlToText(resume.aboutMe?.description ?? '')}
        </Text>
        <View>
          <Text style={styles.header}>Projects</Text>
          {
            resume.projects?.slice(0, 2)?.map((project, index) =>
              <View key={index} style={styles.section}>
                <Text style={styles.subheader}>{project?.name}</Text>
                <Text style={styles.text}>
                  {parseHtmlToText(project?.briefDetail??'')}
                </Text>
              </View>
            )
          }
        </View>
        <View>
          <Text style={styles.header}>Testimonials</Text>
          {
            resume.testimonials?.slice(0, 2)?.map((testimonial, index) =>
              <View key={index} style={styles.section}>
                <Text style={styles.subheader}>{`${testimonial?.name}(${testimonial?.designation})`}</Text>
                <Text style={styles.text}>
                  {parseHtmlToText(testimonial?.description ?? '')}
                </Text>
              </View>
            )
          }
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Skills</Text>
          <View style={{display:'flex', flexDirection:'row', flexWrap: 'wrap'}}>
            {
              resume.skills?.map((skills, index) =>
                <Text key={index} style={styles.listItem}>&#8224;  {skills.name}</Text>
              )
            }
          </View>
        </View>
      </Page>
    </Document>
  )
}