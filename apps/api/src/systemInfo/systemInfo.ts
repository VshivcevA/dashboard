import si from "systeminformation";
import { sse } from "../sse.ts";

export interface ISystemInfo {
  time: {
    currentTime: string;
    uptime: number;
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
  memory: Record<string, never>; // или можно использовать просто {}, если память может содержать данные
  disk: {
    size: number;
    used: number;
    available: number;
    use: number;
  };
}

export async function systemInfo() {
  let valueObject = {
    time: "current,uptime",
    cpuTemperature: "main",
    cpuCurrentSpeed: "avg,cores",
    currentLoad: "currentLoad,cpus",
    mem: "total,used,free,active,available,buffers,cached,buffcache,swaptotal,swapused",
    // osInfo:'platform,distro,release,codename,kernel',
    // disksIO:"*",
    fsSize: "*",
  };
  // const systemInfoData = await si.get(valueObject);

  const getData = () => si.get(valueObject);

  function editData(data: any): ISystemInfo {
    return {
      time: {
        currentTime: new Date(data.time.current).toLocaleString("ru-RU"),
        uptime: data.time.uptime,
      },

      cpu: {
        temperature: data.cpuTemperature.main.toFixed(1),
        load: Math.floor(data.currentLoad.currentLoad),
        frequency: {
          max: 5.3,
          avg: data.cpuCurrentSpeed.avg,
        },
        cores: data.cpuCurrentSpeed.cores.map((cpu: number, index: number) => {
          return {
            frequency: cpu,
            load: Math.floor(data.currentLoad.cpus[index].load),
          };
        }),
      },

      memory: {},
      // for (let memKey in systemInfoData.mem) {
      //   fixSystemInfoData.memory[memKey] = byteToMegabyte(systemInfoData.mem[memKey])
      // },

      disk: {
        size: data.fsSize[0].size,
        used: data.fsSize[0].used,
        available: data.fsSize[0].available,
        use: data.fsSize[0].use,
      },
      // for (let memKey in systemInfoData.disksIO) {
      //     fixSystemInfoData.disk[memKey] = byteToMegabyte(systemInfoData.disksIO[memKey])
      // }

      // fixSystemInfoData.os = systemInfoData.osInfo
    };
  }

  return sse(1000, getData, editData);
}
