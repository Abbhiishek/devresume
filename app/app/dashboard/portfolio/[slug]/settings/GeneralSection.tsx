import { TypographyH2 } from '@/components/common/Typography';
import Form from '@/components/form';
import DeleteSiteForm from '@/components/form/delete-site-form';
import AboutEditor from '@/components/form/site-about-form';
import SocialMediaForm from '@/components/form/social-media-form';
import { updateSite } from '@/lib/actions';
import prisma from '@/lib/db';

export default async function GeneralSection({ siteId }: { siteId: string }) {
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(siteId),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Name"
        description="The name of your site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: 'name',
          type: 'text',
          defaultValue: data?.name!,
          placeholder: 'My Awesome Site',
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Description"
        description="The description of your site. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: 'description',
          type: 'text',
          defaultValue: data?.description!,
          placeholder: 'A blog about really interesting things.',
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Tagline"
        description="Write One Line for you"
        helpText="Try to use as much cool words for you 😎"
        inputAttrs={{
          name: 'tagline',
          type: 'text',
          defaultValue: data?.tagline!,
          placeholder: 'Software developer @company_name',
        }}
        handleSubmit={updateSite}
      />
      <AboutEditor
        siteid={data?.id!}
        defaultValue={data?.about!}
        name="About"
        Title="About"
        description="Write about yourself. This will be displayed in About Section"
        helpText="Try to use as much cool words for you 😎"
      />
      <TypographyH2>Social Media 🤖</TypographyH2>
      <SocialMediaForm
        socials={{
          twitterid: data?.twitterid!,
          linkedinid: data?.linkedinid!,
          githubid: data?.githubid!,
          websiteurl: data?.websiteurl!,
          instagramid: data?.instagramid!,
          youtubeurl: data?.youtubeurl!,
        }}
      />
      <TypographyH2 className="text-red-600 font-black">
        Danger Zone
      </TypographyH2>
      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}
