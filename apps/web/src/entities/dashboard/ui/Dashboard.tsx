"use client";
import { useEffect, useState } from "react";
import { ISystemInfo } from "api/src/systemInfo/systemInfo";
import { Column } from "./Column";

export function Dashboard() {
  const [systemInfo, setSystemInfo] = useState<ISystemInfo>();

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3100/si");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSystemInfo(data);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  if (!systemInfo) {
    return null;
  }
  return (
    <>
      <Column value={Number(systemInfo.cpu.load)} maxValue={100} />
      <div
        style={{
          display: "flex",
        }}
      >
        {systemInfo.cpu.cores.map((core, index) => (
          <div key={index} style={{ display: "flex" }}>
            <Column value={core.load} maxValue={100} />
            {core.frequency != systemInfo.cpu.frequency.max && (
              <Column
                value={core.frequency}
                maxValue={systemInfo.cpu.frequency.max}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <Column
          value={systemInfo.memory.used}
          maxValue={systemInfo.memory.total}
          isBites
        />
        <Column
          value={systemInfo.memory.swapused}
          maxValue={systemInfo.memory.swaptotal}
          isBites
        />
      </div>
      <div style={{ display: "flex" }}>
        <Column
          value={systemInfo.disk.used}
          maxValue={systemInfo.disk.size}
          isBites
        />
        <Column
          value={systemInfo.disk.available}
          maxValue={systemInfo.disk.size}
          isBites
        />
      </div>
      <div>{systemInfo.disk.size}</div>
      <div>{systemInfo.disk.used}</div>
      <div>{systemInfo.disk.available}</div>
      <pre>{JSON.stringify(systemInfo, null, 2)}</pre>
    </>
  );
}
