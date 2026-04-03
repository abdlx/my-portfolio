"use client";

import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  ConnectionMode,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Brain, User, Database, Globe, Monitor, FileText, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const nodeClassName = "px-6 py-4 rounded-xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-sm text-neutral-100 flex items-center gap-3 shadow-2xl min-w-[150px]";

export function InteractivePipeline() {
  const initialNodes = [
    // Inputs
    {
      id: 'user',
      type: 'input',
      data: { label: <div className="flex items-center gap-2"><User size={18} className="text-white" /> User Input</div> },
      position: { x: 50, y: 50 },
      className: nodeClassName,
    },
    {
      id: 'db',
      type: 'input',
      data: { label: <div className="flex items-center gap-2"><Database size={18} className="text-white" /> Database</div> },
      position: { x: 0, y: 150 },
      className: nodeClassName,
    },
    {
      id: 'api',
      type: 'input',
      data: { label: <div className="flex items-center gap-2"><Globe size={18} className="text-white" /> External API</div> },
      position: { x: 50, y: 250 },
      className: nodeClassName,
    },
    // Center
    {
      id: 'brain',
      data: { label: (
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="p-4 rounded-full bg-indigo-500/20 border border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Brain size={32} className="text-indigo-400" />
          </div>
          <span className="font-bold text-indigo-400">The Brain</span>
        </div>
      )},
      position: { x: 300, y: 125 },
      className: "rounded-full border-2 border-indigo-500/30 bg-neutral-950 p-2 shadow-2xl",
    },
    // Outputs
    {
      id: 'ui',
      type: 'output',
      data: { label: <div className="flex items-center gap-2"><Monitor size={18} className="text-emerald-400" /> Responsive UI</div> },
      position: { x: 550, y: 50 },
      className: cn(nodeClassName, "border-emerald-500/30"),
    },
    {
      id: 'report',
      type: 'output',
      data: { label: <div className="flex items-center gap-2"><FileText size={18} className="text-emerald-400" /> Analytics</div> },
      position: { x: 600, y: 150 },
      className: cn(nodeClassName, "border-emerald-500/30"),
    },
    {
      id: 'action',
      type: 'output',
      data: { label: <div className="flex items-center gap-2"><Zap size={18} className="text-emerald-400" /> Executable Action</div> },
      position: { x: 550, y: 250 },
      className: cn(nodeClassName, "border-emerald-500/30"),
    },
  ];

  const initialEdges = [
    { id: 'e-user-brain', source: 'user', target: 'brain', animated: true, style: { stroke: '#6366f1' } },
    { id: 'e-db-brain', source: 'db', target: 'brain', animated: true, style: { stroke: '#6366f1' } },
    { id: 'e-api-brain', source: 'api', target: 'brain', animated: true, style: { stroke: '#6366f1' } },
    { id: 'e-brain-ui', source: 'brain', target: 'ui', animated: true, style: { stroke: '#10b981' } },
    { id: 'e-brain-report', source: 'brain', target: 'report', animated: true, style: { stroke: '#10b981' } },
    { id: 'e-brain-action', source: 'brain', target: 'action', animated: true, style: { stroke: '#10b981' } },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = React.useCallback(
    (params: any) => setEdges((eds) => {
        const isOutputSide = ['ui', 'report', 'action'].includes(params.target);
        return [
            ...eds, 
            { 
                ...params, 
                animated: true, 
                style: { stroke: isOutputSide ? '#10b981' : '#6366f1' } 
            }
        ];
    }),
    [setEdges]
  );

  return (
    <div className="h-[500px] w-full relative">
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
        <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
          Interactive Diagram
        </span>
        <span className="text-[9px] text-neutral-600 font-mono italic">
          (Drag nodes to move | Re-wire by dragging edges)
        </span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        fitView
        colorMode="dark"
      >
        <Background gap={12} size={1} color="#262626" />
      </ReactFlow>
    </div>
  );
}
