import si from "systeminformation";
import { sse } from "../utils/sse.ts";

export interface ISystemInfo {
  time: {
    currentTime: string;
    uptime: string;
  };
  cpu: {
    temperature: string;
    load: number;
    frequency: {
      max: number;
      avg: number;
    };
    cores: Array<{
      frequency: number;
      load: number;
    }>;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    active: number;
    available: number;
    buffers: number;
    cached: number;
    buffcache: number;
    swaptotal: number;
    swapused: number;
  }; // или можно использовать просто {}, если память может содержать данные
  disk: {
    size: number;
    used: number;
    available: number;
    use: number;
  };
}
let valueObject = {
  time: "current,uptime",
  cpu: "speedMax",
  cpuTemperature: "main",
  cpuCurrentSpeed: "avg,cores",
  currentLoad: "currentLoad,cpus",
  mem: "total,used,free,active,available,buffers,cached,buffcache,swaptotal,swapused",
  // osInfo:'platform,distro,release,codename,kernel',
  // disksIO:"*",
  fsSize: "*",
};

export async function systemInfo() {
  const getData = () => si.get(valueObject);

  function editData(data: any): ISystemInfo {
    return {
      time: {
        currentTime: new Date(data.time.current).toLocaleString("ru-RU"),
        uptime:
          new Date(data.time.uptime * 1000).getDate() +
          "d " +
          new Date(data.time.uptime * 1000).toLocaleTimeString("ru"),
      },

      cpu: {
        temperature: data.cpuTemperature.main?.toFixed(1),
        load: Math.floor(data.currentLoad.currentLoad),
        frequency: {
          max: data.cpu.speedMax,
          avg: data.cpuCurrentSpeed.avg,
        },
        cores: data.cpuCurrentSpeed.cores.map((cpu: number, index: number) => {
          return {
            frequency: cpu,
            load: Math.floor(data.currentLoad.cpus[index].load),
          };
        }),
      },

      memory: data.mem,

      disk: {
        ...data.fsSize[0],
        // size: data.fsSize[0].size,
        // used: data.fsSize[0].used,
        // available: data.fsSize[0].available,
        // use: data.fsSize[0].use,
      },
      // for (let memKey in systemInfoData.disksIO) {
      //     fixSystemInfoData.disk[memKey] = byteToMegabyte(systemInfoData.disksIO[memKey])
      // }

      // fixSystemInfoData.os = systemInfoData.osInfo
    };
  }

  return sse(500, getData, editData);
}
