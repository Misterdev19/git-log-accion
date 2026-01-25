import StatsCard from "@/components/StatsCard"
import { Workflow, CloudCheck, CircleSlash , GitGraph  } from "lucide-react";

export default function Dashboard () {
  return (
    <div className="p-4 grid auto-rows-min gap-4 md:grid-cols-4">
      <StatsCard title="Total de acciones" value={1200} percentage={15} icon={<Workflow className="h-5 w-5" />} />
      <StatsCard title="Acciones exitosas" value={1200} percentage={15} icon={<CloudCheck className="h-5 w-5" />} />
      <StatsCard title="Acciones fallidas" value={1200} percentage={15} icon={<CircleSlash className="h-5 w-5" />} />
      <StatsCard title="Total commits" value={1200} percentage={15} icon={<GitGraph className="h-5 w-5" />} />
    </div>
  )
}