import { getSiteBlogAnalytics } from '@/lib/analytics';
import { BlogBarList } from './BarList';

async function BlogAnalytics({ siteid }: { siteid: string }) {
  const blogviews = await getSiteBlogAnalytics(siteid);
  return (
    <div className=" border p-4 rounded-lg">
      <BlogBarList data={blogviews} />
    </div>
  );
}

export default BlogAnalytics;
