"use client";
import { useEffect, useState } from "react";
import { Api } from "api/src";

type ISystemInfo = Api["_routes"]["si"]["get"]["response"]["200"];

export function Dashboard() {
  const [systemInfo, setSystemInfo] = useState<ISystemInfo>();

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3100/si");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSystemInfo(data.currentLoad);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return <pre>{JSON.stringify(systemInfo, null, 2)}</pre>;
}
