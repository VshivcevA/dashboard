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
          <Column key={index} value={core.frequency * 20} maxValue={5.3 * 20} />
        ))}
      </div>
      <pre>{JSON.stringify(systemInfo, null, 2)}</pre>
    </>
  );
}
