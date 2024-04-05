import { MacbookScroll } from '@/components/ui/macbook-scroll';
import prisma from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

async function BlogPreviewSection() {
  const blogs = await prisma?.blog.findMany({
    take: 3,
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      title: true,
      slug: true,
      description: true,
      image: true,
      site: {
        select: {
          name: true,
          customDomain: true,
          subdomain: true,
        },
      },
    },
  });
  return (
    <>
      <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
        <MacbookScroll
          title={
            <span className="lg:text-6xl">
              Show the world that Matters <br />
              <span className="text-green-400 text-xl">The Most</span>
            </span>
          }
          src={`/productshowcase-blog-macbook.png`}
          showGradient={true}
        />
      </div>
      <div className="flex justify-center items-center flex-col dark:bg-[#0B0B0F] bg-white">
        <h1 className="text-5xl font-bold text-center text-neutral-600 dark:text-white">
          Blogs that Speaks for Themselves
        </h1>
        <div className="w-full overflow-hidden  flex md:flex-row  flex-col justify-center items-center lg:gap-4 gap-1 bg-gradient-to-b from-[#0B0B0F] to-slate-900  mt-2">
          {blogs.map((blog, index) => {
            // if custom domain is present use it else use subdomain , in custom domain .dresume.me wont be used

            let domain;

            if (blog.site?.customDomain) {
              domain = blog.site.customDomain;
            } else {
              domain = `${blog.site?.subdomain || ''}.dresume.me`;
            }
            return (
              <BlogPreviewCard
                key={index}
                title={blog.title || ''}
                image={blog.image || ''}
                slug={blog.slug || ''}
                descripton={blog.description || ''}
                domain={domain || ''}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function BlogPreviewCard({
  title,
  image,
  slug,
  descripton,
  domain,
}: {
  title: string;
  image: string;
  slug: string;
  descripton: string;
  domain: string;
}) {
  return (
    <Link href={`https://${domain}/blog/${slug}`} target="_blank">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem translateZ="150" className="w-full my-4">
            <Image
              src={image}
              alt={`${title}-thumbnail`}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            />
          </CardItem>
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {descripton}
          </CardItem>
        </CardBody>
      </CardContainer>
    </Link>
  );
}

export default BlogPreviewSection;
