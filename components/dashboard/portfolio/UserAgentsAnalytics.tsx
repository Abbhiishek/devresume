import { getSiteUserAgentAnalytics } from '@/lib/analytics';
import { BrowsersAgents, DeviceAgents, OsAgents } from './BarList';

async function UserAgentsAnalytics({ siteid }: { siteid: string }) {
  const useragentdata = await getSiteUserAgentAnalytics(siteid);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4  mt-8">
      <BrowsersAgents data={useragentdata.browser} />
      <OsAgents data={useragentdata.os} />
      <DeviceAgents data={useragentdata.device} />
    </div>
  );
}

export default UserAgentsAnalytics;
