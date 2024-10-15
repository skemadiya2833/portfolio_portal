import { ImageType } from "@/types/ImageType";
import { ResumeType } from "@/types/ResumeType";
import { parseHtmlToText } from "@/util/parseHtmlToText";
import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

Font.register({
    family: 'Tinos',
    src: 'http://fonts.gstatic.com/s/tinos/v9/EqpUbkVmutfwZ0PjpoGwCg.ttf'
});

const styles = StyleSheet.create({
    page: {
        fontFamily:'Tinos'
    },
    contact: {
        padding: 15,
        borderBottom: '1px solid white'
    },
    text: {
        fontSize: '12',
        padding: '0 15',
        textAlign: 'justify'
    },
    h2: {
        fontSize: '24',
        marginTop: 1,
        marginBottom: 1,
        padding: 10,
        borderBottom: '1px solid white'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexGrow: 1,
    },
    left: {
        flexGrow: 1,
        flexBasis: 0,
        backgroundColor: '#345',
        color: 'white'
    },
    header: {
        fontSize: 20,
        padding: '10 0 0 15'
    },
    subheader: {
        fontSize: 16,
        padding: 15,
    },
    skills: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 15,
        justifyContent: 'space-between'
    },
    projects: {
        borderBottom: '1px solid grey',
        paddingBottom: 15
    },
    listItem: {
        fontSize: 12,
        margin: 5
    },
    right: {
        width: '60%'
    },
    userInfo: {
        fontSize: 12,
        padding: 15,
        textAlign: 'justify',
        borderBottom: '1px solid grey'
    },
    contactInfo: {
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'justify'
    },
    image: {
        margin: 15,
        width: '200px',
        height: '200px',
        borderRadius: '50%',
    }
});

Font.registerHyphenationCallback((word) => {
    return [word];
});

export default function ResumeTemplate2(resume: ResumeType) {
    return (
        <Document>
            <Page style={styles.page} wrap size="A4">
                <View style={styles.row}>
                    <View style={styles.left}>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image
                            style={styles.image}
                            src={`data:${(resume.aboutMe?.image as ImageType)?.type};base64,${(resume.aboutMe?.image as ImageType)?.imageData}`}
                        />
                        <Text style={styles.h2}>{resume.aboutMe?.name}</Text>
                        <View style={styles.contact}>
                            <Text style={styles.contactInfo}>{resume.contact?.phoneNo}</Text>
                            <Text style={styles.contactInfo}>{resume.contact?.emailId}</Text>
                            <Text style={styles.contactInfo}>{resume.contact?.address}</Text>
                        </View>
                        <Text style={styles.header}>Skills</Text>
                        <View style={styles.skills}>
                            {
                                resume.skills?.map((skills, index) =>
                                    <Text key={index} style={styles.listItem}>&#8224;  {skills.name}</Text>
                                )
                            }
                        </View>
                    </View>
                    <View style={styles.right}>
                        <Text style={[styles.userInfo]}>
                            {parseHtmlToText(resume.aboutMe?.description ?? '')}
                        </Text>
                        <Text style={styles.header}>Projects</Text>
                        <View style={styles.projects}>
                            {
                                resume.projects?.slice(0, 2)?.map((project, index) =>
                                    <View key={index}>
                                        <Text style={styles.subheader}>{project?.name}</Text>
                                        <Text style={styles.text}>
                                            {parseHtmlToText(project?.briefDetail ?? '')}
                                        </Text>
                                    </View>
                                )
                            }
                        </View>
                        <Text style={styles.header}>Testimonials</Text>
                        <View>
                            {
                                resume.testimonials?.slice(0, 2)?.map((testimonial, index) =>
                                    <View key={index}>
                                        <Text style={styles.subheader}>{`${testimonial?.name}(${testimonial?.designation})`}</Text>
                                        <Text style={styles.text}>
                                            {parseHtmlToText(testimonial?.description ?? '')}
                                        </Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}