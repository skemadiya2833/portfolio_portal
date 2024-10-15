import { AboutMeType } from "./AboutMeType"
import { ContactType } from "./ContactType"
import { ProjectsType } from "./ProjectsType"
import { SkillsType } from "./SkillsType"
import { TestimonialType } from "./TestimonialType"

export type ResumeType = {
    aboutMe : AboutMeType | null,
    contact : ContactType | null,
    projects : ProjectsType[] | [],
    testimonials : TestimonialType[] | [],
    skills : SkillsType[] | []
}   