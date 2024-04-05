import {
  Projects,
  SiteTechStack,
  UserCertificate,
  UserEducation,
  UserWorkExperience,
} from '@prisma/client';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import AboutSection from './default/AboutSection';
import ContactSection from './default/ContactSection';
import EducationSection from './default/EducationSection';
import ExperienceSection from './default/ExperienceSection';
import FooterSection from './default/FooterSection';
import HomeSection from './default/HomeSection';
import UserPortfolioNavbar from './default/Navbar';
import ProjectSection from './default/ProjectSection';
import TechStackSection from './default/TechStack';

function DefaultTheme({
  sitedata,
  about,
}: {
  // sitedata conatins mixed tyypes
  sitedata: {
    id: string;
    education: UserEducation[];
    certificates: UserCertificate[];
    workexperience: UserWorkExperience[];
    projects: Projects[];
    siteTechStack: SiteTechStack[];
    name: string;
    tagline: string;
    logo: string | null;
    twitterid: string | null;
    githubid: string | null;
    linkedinid: string | null;
    websiteurl: string | null;
    youtubeurl: string | null;
    instagramid: string | null;
    skills: string[];
  };
  about: {
    about: string;
    mdxSource: MDXRemoteSerializeResult<
      Record<string, unknown>,
      Record<string, unknown>
    >;
  };
}) {
  return (
    <>
      <UserPortfolioNavbar
        name={sitedata.name!}
        logo={sitedata.logo!}
        siteid={sitedata.id!}
      />
      <div className="container px-2 mx-auto">
        <HomeSection
          name={sitedata.name}
          image={sitedata.logo!}
          tagline={sitedata.tagline!}
          twitterid={sitedata.twitterid!}
          githubid={sitedata.githubid!}
          linkedinid={sitedata.linkedinid!}
          websiteurl={sitedata.websiteurl!}
          youtubeurl={sitedata.youtubeurl!}
          instagramid={sitedata.instagramid!}
        />
        <AboutSection skills={sitedata.skills} mdxabout={about.mdxSource} />

        <TechStackSection siteId={sitedata.id} />

        <EducationSection education={sitedata.education} />

        <ExperienceSection workexperience={sitedata.workexperience} />

        <ProjectSection projects={sitedata.projects} />

        <ContactSection
          twitterid={sitedata.twitterid!}
          githubid={sitedata.githubid!}
          linkedinid={sitedata.linkedinid!}
          websiteurl={sitedata.websiteurl!}
          youtubeurl={sitedata.youtubeurl!}
          instagramid={sitedata.instagramid!}
        />

        <FooterSection />
      </div>
    </>
  );
}

export default DefaultTheme;
