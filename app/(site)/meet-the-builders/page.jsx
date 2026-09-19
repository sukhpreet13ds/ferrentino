import { getContent } from "../../../lib/data";
import TeamClient from "../../../components/team/TeamClient";

export default function MeetTheBuildersPage() {
  const data = getContent("team", { members: [] });
  return <TeamClient data={data} />;
}
