import { MoreHorizontal, Download, ArrowUpDown } from "lucide-react";

interface Activity {
  status: "success" | "failed" | "running";
  action: string;
  workflowId: string;
  user: string;
  email: string;
  branch: string;
  time: string;
  commitHash?: string;
  commitMessage?: string;
}

const activities: Activity[] = [
  {
    status: "success",
    action: "Production Deploy",
    workflowId: "8429",
    user: "Alex Chen",
    email: "alex@acme.dev",
    branch: "main",
    time: "5 mins ago",
    commitHash: "7a1f2c4",
    commitMessage: "feat: upgrade stripe-node dependency and add payment intent monitoring logs",
  },
  {
    status: "failed",
    action: "Unit Tests",
    workflowId: "8421",
    user: "Sarah Jenkins",
    email: "sarah@acme.dev",
    branch: "fix/auth-leak",
    time: "12 mins ago",
  },
  {
    status: "running",
    action: "Security Scan",
    workflowId: "8415",
    user: "Github Action Bot",
    email: "system@acme.dev",
    branch: "main",
    time: "22 mins ago",
  },
];

function StatusBadge({ status }: { status: Activity["status"] }) {
  const styles = {
    success: "bg-emerald-500/10 text-emerald-400",
    failed: "bg-red-500/10 text-red-400",
    running: "bg-blue-500/10 text-blue-400",
  };

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <span className="mr-2 h-2 w-2 rounded-full bg-current" />
      {label}
    </span>
  );
}

export default function RecentActivityTable() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-400">
              <th className="py-3">Status</th>
              <th>Action Type</th>
              <th>User</th>
              <th>Branch</th>
              <th>Timestamp</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {activities.map((item, index) => (
              <tr
                key={index}
                className="border-b border-slate-800 hover:bg-slate-800/40"
              >
                <td className="py-4">
                  <StatusBadge status={item.status} />
                </td>

                <td>
                  <div className="font-medium text-white">{item.action}</div>
                  <div className="text-xs text-slate-400">workflow_id: {item.workflowId}</div>

                  {item.commitHash && (
                    <div className="mt-2 rounded-lg bg-slate-900 p-3 text-xs text-slate-300">
                      <span className="font-semibold text-blue-400">{item.commitHash}</span>{" "}
                      <span className="italic">{item.commitMessage}</span>
                    </div>
                  )}
                </td>

                <td>
                  <div className="font-medium text-white">{item.user}</div>
                  <div className="text-xs text-slate-400">{item.email}</div>
                </td>

                <td>
                  <span className="rounded-md bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                    {item.branch}
                  </span>
                </td>

                <td className="text-slate-400">{item.time}</td>

                <td className="text-right">
                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>Showing 1–10 of 1,284 actions</span>

        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-700 px-3 py-1 hover:bg-slate-800">
            ‹
          </button>
          <button className="rounded-lg bg-blue-600 px-3 py-1 text-white">1</button>
          <button className="rounded-lg border border-slate-700 px-3 py-1 hover:bg-slate-800">
            2
          </button>
          <button className="rounded-lg border border-slate-700 px-3 py-1 hover:bg-slate-800">
            3
          </button>
          <button className="rounded-lg border border-slate-700 px-3 py-1 hover:bg-slate-800">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
