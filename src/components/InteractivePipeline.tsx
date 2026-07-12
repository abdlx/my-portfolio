"use client";

import React from 'react';
import {
  ReactFlow,
  Background,
  ConnectionMode,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Brain, User, Database, Globe, Monitor, FileText, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const nodeClassName = "px-5 py-3.5 border border-[rgba(241,240,233,0.12)] bg-[#0b0b0c]/90 backdrop-blur-sm text-[#F1F0E9] flex items-center gap-3 shadow-2xl min-w-[150px] font-mono text-xs uppercase tracking-wider";

export function InteractivePipeline() {
  const initialNodes = [
    // Inputs
    {
      id: 'user',
      type: 'input',
      data: { label: <div className="flex items-center gap-2"><User size={16} className="text-[#8C8C82]" /> User Input</div> },
      position: { x: 50, y: 50 },
      className: nodeClassName,
    },
    {
      id: 'db',
      type: 'input',
      data: { label: <div className="flex items-center gap-2"><Database size={16} className="text-[#8C8C82]" /> Database</div> },
      position: { x: 0, y: 150 },
      className: nodeClassName,
    },
    {
      id: 'api',
      type: 'input',
      data: { label: <div className="flex items-center gap-2"><Globe size={16} className="text-[#8C8C82]" /> External API</div> },
      position: { x: 50, y: 250 },
      className: nodeClassName,
    },
    // Center
    {
      id: 'brain',
      data: { label: (
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="p-4 rounded-full bg-[rgba(203,255,74,0.1)] border border-[rgba(203,255,74,0.5)] shadow-[0_0_24px_rgba(203,255,74,0.25)]">
            <Brain size={30} className="text-[#CBFF4A]" />
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#CBFF4A]">The Brain</span>
        </div>
      )},
      position: { x: 300, y: 125 },
      className: "rounded-full border border-[rgba(203,255,74,0.3)] bg-[#070707] p-2 shadow-2xl",
    },
    // Outputs
    {
      id: 'ui',
      type: 'output',
      data: { label: <div className="flex items-center gap-2"><Monitor size={16} className="text-[#CBFF4A]" /> Responsive UI</div> },
      position: { x: 550, y: 50 },
      className: cn(nodeClassName, "border-[rgba(203,255,74,0.35)]"),
    },
    {
      id: 'report',
      type: 'output',
      data: { label: <div className="flex items-center gap-2"><FileText size={16} className="text-[#CBFF4A]" /> Analytics</div> },
      position: { x: 600, y: 150 },
      className: cn(nodeClassName, "border-[rgba(203,255,74,0.35)]"),
    },
    {
      id: 'action',
      type: 'output',
      data: { label: <div className="flex items-center gap-2"><Zap size={16} className="text-[#CBFF4A]" /> Executable Action</div> },
      position: { x: 550, y: 250 },
      className: cn(nodeClassName, "border-[rgba(203,255,74,0.35)]"),
    },
  ];

  const initialEdges = [
    { id: 'e-user-brain', source: 'user', target: 'brain', animated: true, style: { stroke: '#4b4b44' } },
    { id: 'e-db-brain', source: 'db', target: 'brain', animated: true, style: { stroke: '#4b4b44' } },
    { id: 'e-api-brain', source: 'api', target: 'brain', animated: true, style: { stroke: '#4b4b44' } },
    { id: 'e-brain-ui', source: 'brain', target: 'ui', animated: true, style: { stroke: '#CBFF4A' } },
    { id: 'e-brain-report', source: 'brain', target: 'report', animated: true, style: { stroke: '#CBFF4A' } },
    { id: 'e-brain-action', source: 'brain', target: 'action', animated: true, style: { stroke: '#CBFF4A' } },
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
                style: { stroke: isOutputSide ? '#CBFF4A' : '#4b4b44' }
            }
        ];
    }),
    [setEdges]
  );

  return (
    <div className="h-[500px] w-full relative" data-cursor="DRAG">
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
        <span className="px-3 py-1 border border-[rgba(241,240,233,0.12)] bg-[#0b0b0c] text-[10px] text-[#8C8C82] font-mono tracking-[0.2em] uppercase">
          Live Diagram
        </span>
        <span className="text-[9px] text-[#4b4b44] font-mono">
          drag nodes / re-wire edges
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
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={14} size={1} color="#1d1d1b" />
      </ReactFlow>
    </div>
  );
}
