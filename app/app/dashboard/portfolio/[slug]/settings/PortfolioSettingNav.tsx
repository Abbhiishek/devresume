import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppearanceSection from './AppearanceSection';
import CertificateSection from './CertificateSection';
import DomainSection from './DomainSection';
import EducationSection from './EducationSection';
import GeneralSection from './GeneralSection';
import SkillsToolsSection from './SkillsToolsSection';
import WorkExperienceSection from './WorkSection';

export default function SiteSettingsNav({ slug }: { slug: string }) {
  const navItems = [
    {
      name: 'General',
      value: 'general',
      component: <GeneralSection siteId={slug} />,
    },
    {
      name: 'Domain',
      value: 'domain',
      component: <DomainSection siteId={slug} />,
    },
    {
      name: 'Education',
      value: 'education',
      component: <EducationSection siteId={slug} />,
    },
    {
      name: 'Skills & Tools',
      value: 'tools',
      component: <SkillsToolsSection siteId={slug} />,
    },
    {
      name: 'Work',
      value: 'work',
      component: <WorkExperienceSection siteId={slug} />,
    },
    {
      name: 'Project',
      value: 'project',
      component: <CertificateSection />,
    },
    {
      name: 'Certification',
      value: 'certificate',
      component: <CertificateSection />,
    },
    {
      name: 'Appearance',
      value: 'appearance',
      component: <AppearanceSection siteId={slug} />,
    },
  ];

  return (
    <div className="flex space-x-4 border-b  pb-4 pt-2">
      <Tabs defaultValue="general" className="w-full h-full">
        <TabsList className="grid w-full lg:grid-cols-8 h-full grid-cols-1  rounded-3xl content-center bg-stone-200 dark:bg-stone-800 ">
          {navItems.map((nav, index) => (
            <TabsTrigger
              key={index}
              value={nav.value}
              className={"rounded-3xl "}
            >
              {nav.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {navItems.map((nav, index) => (
          <TabsContent key={index} value={nav.value}>
            {nav.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
