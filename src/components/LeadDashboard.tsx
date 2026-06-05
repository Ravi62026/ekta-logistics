import React, { useState } from 'react';
import { Database, Download, Trash2, CheckCircle, FileSpreadsheet, RefreshCw, Filter, Sparkles, LogOut } from 'lucide-react';
import { Lead } from '../types';

interface LeadDashboardProps {
  leads: Lead[];
  onUpdateStatus: (id: string, newStatus: Lead['status']) => void;
  onClearLeads: () => void;
  onPopulateDemoLeads: () => void;
  onLogout: () => void;
}

export default function LeadDashboard({ leads, onUpdateStatus, onClearLeads, onPopulateDemoLeads, onLogout }: LeadDashboardProps) {
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredLeads = leads.filter(lead => {
    const codeSource = filterSource === 'all' || lead.source === filterSource;
    const codeStatus = filterStatus === 'all' || lead.status === filterStatus;
    return codeSource && codeStatus;
  });

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return;
    
    // Construct CSV columns
    const headers = ['LeadID', 'Name', 'Phone', 'Email', 'Pickup_City', 'Destination_City', 'Moving_Date', 'Property_Type', 'House_Size', 'Notes', 'Created_At', 'Lead_Source', 'Status'];
    const csvRows = [headers.join(',')];

    filteredLeads.forEach(lead => {
      const values = [
        lead.id,
        `"${lead.name.replace(/"/g, '""')}"`,
        `"${lead.phone}"`,
        `"${lead.email.replace(/"/g, '""')}"`,
        `"${lead.pickupCity.replace(/"/g, '""')}"`,
        `"${lead.destinationCity.replace(/"/g, '""')}"`,
        `"${lead.movingDate}"`,
        `"${lead.propertyType}"`,
        `"${lead.houseSize}"`,
        `"${(lead.notes || '').replace(/"/g, '""')}"`,
        lead.createdAt,
        lead.source,
        lead.status
      ];
      csvRows.push(values.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EKTA_LOGISTICS_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-slate-50 min-h-[500px] border border-slate-200 rounded-2xl p-3 sm:p-6">
      
      {/* Brand Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 sm:pb-5 mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-750">
            <Database className="h-6 w-6 stroke-[2]" />
            <span className="font-mono text-sm tracking-widest uppercase bg-blue-100 text-blue-750 px-2.5 py-0.5 rounded-md font-bold">
              Google Sheets Lead Integration
            </span>
          </div>
          <h2 className="font-sans text-xl font-bold text-slate-800 mt-2">
            Real Shifting Inquiries Ledgers
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-1">
            This administrative control system mirrors client quote logs synchronized via EmailJS & direct sheets.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Dashboard actions">
          {leads.length === 0 ? (
            <button
              onClick={onPopulateDemoLeads}
              className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Simulate Testing Rows</span>
            </button>
          ) : (
            <>
              <button
                onClick={exportLeadsToCSV}
                className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download CSV (Sheet Model)</span>
              </button>
              <button
                onClick={onClearLeads}
                className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-650 border border-red-200 rounded-lg transition-all focus:outline-none cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Wipe Database</span>
              </button>
            </>
          )}
          <button
            onClick={onLogout}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Secure Log Out</span>
          </button>
        </div>
      </div>

      {leads.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white p-2.5 sm:p-3.5 rounded-xl border border-slate-200 mb-4 sm:mb-6 text-xs text-slate-700 font-sans" role="group" aria-label="Lead filters">
          <div className="flex items-center space-x-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-bold">Filters:</span>
          </div>
          
          <div>
            <span className="mr-1">Source:</span>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-blue-700 font-medium"
            >
              <option value="all">All Sources</option>
              <option value="quote_form">Interactive Quote Estimator</option>
              <option value="contact_form">Contact Feedback Form</option>
            </select>
          </div>

          <div>
            <span className="mr-1">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-blue-700 font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="Fresh">Fresh</option>
              <option value="Contacted">Contacted</option>
              <option value="Quoted">Quoted</option>
              <option value="Booking Confirmed">Booking Confirmed</option>
            </select>
          </div>

          <div className="ml-auto font-mono text-[10px] text-slate-400">
            Displaying {filteredLeads.length} of {leads.length} Records
          </div>
        </div>
      )}

      {/* Ledger Table */}
      {filteredLeads.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <FileSpreadsheet className="h-6 w-6" />
          </div>
          <h4 className="font-sans text-sm font-bold text-slate-700">No Records Found</h4>
          <p className="text-xs text-slate-400 font-sans max-w-sm mt-1">
            Submit a relocation quote request or submit contact questions to see instant entries written to this dashboard dynamically.
          </p>
          <button
            onClick={onPopulateDemoLeads}
            className="mt-4 px-4 py-1.5 text-xs font-semibold text-blue-750 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100"
          >
            Load Simulated Demo Records
          </button>
        </div>
      ) : (
        <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm font-sans">
          <div className="relative overflow-x-auto font-sans" role="region" aria-label="Lead records table">
            <table className="w-full text-left border-collapse font-sans text-xs" aria-label="Lead management table">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3.5">ID / Date</th>
                  <th className="px-4 py-3.5">Shifting Client</th>
                  <th className="px-4 py-3.5">Transit Cities</th>
                  <th className="px-4 py-3.5">Property / Size</th>
                  <th className="px-4 py-3.5">Specifications</th>
                  <th className="px-4 py-3.5">Shifting Channel</th>
                  <th className="px-4 py-3.5">Stage & Call Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                {filteredLeads.map((lead) => {
                  const submitDate = new Date(lead.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="font-mono font-bold text-blue-750">{lead.id}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{submitDate}</div>
                      </td>
                      <td className="px-4 py-3.5 font-sans">
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        <div className="font-mono font-semibold text-[11px] text-slate-500 mt-0.5">{lead.phone}</div>
                        <div className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">{lead.email || 'No email'}</div>
                      </td>
                      <td className="px-4 py-3.5 font-sans">
                        <div className="flex items-center text-slate-900 font-medium">
                          <span className="text-slate-400 mr-1 font-mono text-[10px]">FROM:</span>
                          {lead.pickupCity}
                        </div>
                        <div className="flex items-center text-blue-750 font-bold mt-1">
                          <span className="text-slate-400 mr-1.5 font-mono text-[10px]">TO:</span>
                          {lead.destinationCity}
                        </div>
                        <div className="text-[10px] font-mono text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200/30 inline-block mt-1.5 font-semibold">
                          Date: {lead.movingDate}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="bg-slate-100/80 text-slate-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                          {lead.propertyType}
                        </span>
                        <div className="text-slate-900 font-bold mt-1">{lead.houseSize}</div>
                      </td>
                      <td className="px-4 py-3.5 max-w-[180px]">
                        <span className="text-slate-500 text-[11px] italic block break-words">
                          {lead.notes ? `"${lead.notes}"` : 'No custom notes provided'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase ${
                          lead.source === 'quote_form' 
                            ? 'bg-blue-50 text-blue-750 border border-blue-200' 
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {lead.source.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateStatus(lead.id, e.target.value as Lead['status'])}
                          className={`font-sans font-bold text-[11px] outline-none rounded border px-2 py-1 ${
                            lead.status === 'Fresh' 
                              ? 'bg-orange-100 text-orange-850 border-orange-300' 
                              : lead.status === 'Contacted' 
                              ? 'bg-blue-100 text-blue-800 border-blue-300' 
                              : lead.status === 'Quoted' 
                              ? 'bg-sky-100 text-sky-800 border-sky-300' 
                              : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          }`}
                        >
                          <option value="Fresh">Fresh / Recvd</option>
                          <option value="Contacted">Crew Contacted</option>
                          <option value="Quoted">Quotation Raised</option>
                          <option value="Booking Confirmed">Booking Confirmed</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
