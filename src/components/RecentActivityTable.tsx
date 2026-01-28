import { useState, useEffect } from 'react';
import { MoreHorizontal, Download, ArrowUpDown } from "lucide-react";
import type { ActionsResponse, Action } from '@/types/Action';

type StatusType = "SUCCESS" | "FAILED" | "RUNNING";

function StatusBadge({ status }: { status: StatusType }) {
  const styles = {
    SUCCESS: "bg-emerald-500/10 text-emerald-400",
    FAILED: "bg-red-500/10 text-red-400",
    RUNNING: "bg-blue-500/10 text-blue-400",
  };

  const labels = {
    SUCCESS: "Success",
    FAILED: "Failed",
    RUNNING: "Running",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <span className="mr-2 h-2 w-2 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}

export default function RecentActivityTable() {
  const [actions, setActions] = useState<Action[]>([]);
  const [meta, setMeta] = useState<ActionsResponse['meta'] | null>(null);
  const [links, setLinks] = useState<ActionsResponse['links'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchActions = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/v1/actions?page=${page}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      
      const data: ActionsResponse = await response.json();
      setActions(data.data);
      setMeta(data.meta);
      setLinks(data.links);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActions(currentPage);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && meta && page <= meta.last_page) {
      fetchActions(page);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Justo ahora';
    if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hora${diffInHours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-xl">
        <div className="flex items-center justify-center py-12 text-slate-400">
          Cargando acciones...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-xl">
        <div className="flex items-center justify-center py-12 text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

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
            {actions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No hay acciones registradas
                </td>
              </tr>
            ) : (
              actions.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="py-4">
                    <StatusBadge status={item.status as StatusType} />
                  </td>

                  <td>
                    <div className="font-medium text-white">{item.action_type}</div>
                    <div className="text-xs text-slate-400">ID: {item.id}</div>

                    {item.last_commit && item.last_commit.hash && (
                      <div className="mt-2 rounded-lg bg-slate-900 p-3 text-xs text-slate-300">
                        <span className="font-semibold text-blue-400">
                          {item.last_commit.hash}
                        </span>{" "}
                        <span className="italic">{item.last_commit.message}</span>
                      </div>
                    )}
                  </td>

                  <td>
                    <div className="font-medium text-white">{item.user.name}</div>
                    <div className="text-xs text-slate-400">{item.user.email}</div>
                  </td>

                  <td>
                    <span className="rounded-md bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                      {item.branch_name}
                    </span>
                  </td>

                  <td className="text-slate-400">{formatTimeAgo(item.timestamp)}</td>

                  <td className="text-right">
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      {meta && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>
            Showing {meta.from}–{meta.to} of {meta.total} actions
          </span>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!links?.prev}
              className="rounded-lg border border-slate-700 px-3 py-1 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            
            {Array.from({ length: meta.last_page }, (_, i) => i + 1)
              .filter(page => {
                // Mostrar solo páginas cercanas a la actual
                return page === 1 || 
                       page === meta.last_page || 
                       (page >= currentPage - 1 && page <= currentPage + 1);
              })
              .map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`rounded-lg px-3 py-1 ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {page}
                </button>
              ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!links?.next}
              className="rounded-lg border border-slate-700 px-3 py-1 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}