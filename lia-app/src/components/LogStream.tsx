import React, { useEffect, useState, useRef } from 'react';

interface LogEntry {
  id: number;
  message: string;
  timestamp: string;
}

export const LogStream: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Determine the base URL for the SSE endpoint
    // In production, it will be at the root. In dev, we might need to handle it.
    const sseUrl = '/sse_logs.php';
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.message) {
          const newEntry: LogEntry = {
            id: Date.now() + Math.random(),
            message: data.message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setLogs((prevLogs) => [...prevLogs, newEntry].slice(-100));
        }
      } catch (e) {
        console.error("Error parsing SSE data", e);
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource failed:", err);
      // Attempt to reconnect after some time could be added here
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [logs]);

  const renderMessage = (message: string) => {
    const msgUpper = message.toUpperCase();
    let colorClass = 'text-white/70';
    let isLia = false;

    if (msgUpper.includes('ERROR')) {
      colorClass = 'text-red-500 font-bold';
    } else if (msgUpper.includes('WARN')) {
      colorClass = 'text-yellow-400';
    } else if (msgUpper.includes('LIA')) {
      colorClass = 'text-magenta';
      isLia = true;
    } else if (msgUpper.includes('INFO') || msgUpper.includes('SYS')) {
      colorClass = 'text-blue-400';
    }

    if (isLia) {
      // Try to highlight quoted text in LIA logs
      const parts = message.split(/("[^"]*")/);
      return (
        <span className={colorClass}>
          {parts.map((part, i) =>
            part.startsWith('"') && part.endsWith('"')
              ? <span key={i} className="italic brightness-125 font-bold">{part}</span>
              : <span key={i}>{part}</span>
          )}
        </span>
      );
    }

    return <span className={colorClass}>{message}</span>;
  };

  return (
    <div
      ref={scrollRef}
      className="h-full font-mono text-[0.7rem] overflow-y-auto space-y-3 pr-2 scrollbar-hide"
    >
      {logs.length === 0 && (
        <div className="text-white/20 italic">Waiting for logs...</div>
      )}
      {logs.map((log) => (
        <div key={log.id} className="flex gap-3">
          <span className="text-white/10 shrink-0 select-none">{log.timestamp}</span>
          <div className="flex-1 break-words">
            {renderMessage(log.message)}
          </div>
        </div>
      ))}
      <div className="animate-pulse text-magenta mt-2 select-none">_</div>
    </div>
  );
};
