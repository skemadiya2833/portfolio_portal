import { AboutMeType } from "./AboutMeType"
import { ContactType } from "./ContactType"
import { ProjectsType } from "./ProjectsType"
import { SkillsType } from "./SkillsType"
import { SocialMediaType } from "./SocialMediaType"
import { TestimonialType } from "./TestimonialType"

export type UserResponseType = {
    id : string,
    firstName : string,
    lastName : string,
    emailId : string,
    username : string,
    portfolioUrl : string,
    aboutMe : AboutMeType,
    skills : SkillsType[],
    projects : ProjectsType[],
    testimonials : TestimonialType[],
    contact : ContactType,
    socialMedias : SocialMediaType[]
}