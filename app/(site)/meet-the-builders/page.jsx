import { getContent } from "../../../lib/data";
import TeamClient from "../../../components/team/TeamClient";

export default async function MeetTheBuildersPage() {
  const data = await getContent("team", { members: [] });
  return <TeamClient data={data} />;
}
