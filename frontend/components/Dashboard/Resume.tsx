import styles from '@/styles/Dashboard.module.css'
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import ResumeTemplate1 from "../Resume/ResumeTemplate1";
import { useAppSelector } from "@/hooks/hooks";
import React, { useEffect, useState } from "react";
import { Divider, Select, SelectItem, Radio, RadioGroup } from '@nextui-org/react';
import { ProjectsType } from '@/types/ProjectsType';
import { TestimonialType } from '@/types/TestimonialType';
import ResumeTemplate2 from '../Resume/ResumeTemplate2';

export default function Resume() {

    const resumeState = useAppSelector(state => state.resume);
    const [projects, setProjects] = useState<ProjectsType[]>([]);
    const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
    const [pdfUrl, setPdfUrl] = useState<string>("");
    const [isDataPresent, setIsDataPresent] = useState<boolean>(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('template1');

    useEffect(() => {

        const generatePDFPreview = async () => {
            const SelectedTemplate = selectedTemplate === 'template1' ? ResumeTemplate1 : ResumeTemplate2;
            const blob = await pdf(<SelectedTemplate {...{ ...resumeState, projects: projects, testimonials: testimonials }} />).toBlob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        };

        if (resumeState) {
            setIsDataPresent(
                resumeState.aboutMe !== null &&
                resumeState.contact !== null &&
                projects.length >= 2 &&
                testimonials.length >= 2 &&
                resumeState.skills.length !== 0
            )
            generatePDFPreview();
        }
    }, [resumeState, projects, testimonials, selectedTemplate])
        
    const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const keys = value.split(',');
        let data = keys.map((key) => {
            const project = resumeState.projects.find((project) => project.id === key)
            return project;
        });
        setProjects(data as ProjectsType[]);
    }
    
    const handleTestimonialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const keys = value.split(',');
        let data = keys.map((key) => {
            const testimonial = resumeState.testimonials.find((testimonial) => testimonial.id === key)
            return testimonial;
        });
        setTestimonials(data as TestimonialType[]);
    }

    return (
        <div className='h-full'>
            <div className={styles['data-chips']} />
            <Divider />
            <div className='flex flex-col h-full md:flex-row'>
                <form className={`md:w-1/2 ${styles['dashboard-form']}`}>
                    <h2>Your Resume</h2>
                    <RadioGroup color='secondary' orientation="horizontal" value={selectedTemplate} onValueChange={setSelectedTemplate} defaultValue="template1">
                        <Radio value="template1">Template 1</Radio>
                        <Radio value="template2">Template 2</Radio>
                    </RadioGroup>

                    <Select id='projects' name='projects' aria-label='Projects' selectionMode='multiple' items={resumeState.projects} placeholder="Select your main 2 Projects" className={'p-5'} variant='bordered' onChange={handleProjectChange}>
                        {(project) => <SelectItem key={project?.id}>{project?.name}</SelectItem>}
                    </Select>
                    <Select id='testimonials' name='testimonials' aria-label='Testimonials' selectionMode='multiple' items={resumeState.testimonials} placeholder="Select your main 2 Testimonials" className={'p-5'} variant='bordered' onChange={handleTestimonialChange}>
                        {(testimonial) => <SelectItem key={testimonial?.id}>{testimonial?.name}</SelectItem>}
                    </Select>

                    {isDataPresent ? (
                        <PDFDownloadLink 
                            className={`text-center ${styles['submit-button']}`} 
                            document={
                                selectedTemplate === 'template1' 
                                    ? <ResumeTemplate1 {...{ ...resumeState, projects: projects, testimonials: testimonials }} />
                                    : <ResumeTemplate2 {...{ ...resumeState, projects: projects, testimonials: testimonials }} />
                            } 
                            fileName={`${resumeState.aboutMe?.name}_resume.pdf`}
                        >
                            Download your Resume
                        </PDFDownloadLink>
                    ) : (
                        <p className='text-center text-danger-500'>
                            * Please provide aboutMe details, contact details, at least 2 projects, 2 testimonials, and 1 skill to download resume
                        </p>
                    )}
                </form>

                {pdfUrl && (
                    <iframe
                        src={`${pdfUrl}#toolbar=0`}
                        className='w-full md:w-1/2 shadow-lg pt-2.5 mt-3'
                        height="100%"
                        title="PDF Preview"
                    />
                )}
            </div>
        </div>
    );
};