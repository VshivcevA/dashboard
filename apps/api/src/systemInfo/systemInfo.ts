import si from "systeminformation";

export function systemInfo() {
  console.log("start");

  let interval: NodeJS.Timeout;
  const stream = new ReadableStream({
    start(controller) {
      interval = setInterval(async () => {
        const data = await si.currentLoad();
        const sseMessage = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(sseMessage));
      }, 1000);

      return () => {
        console.log("close");
        clearInterval(interval);
        controller.enqueue(new TextEncoder().encode("event: close\n\n"));
        controller.close();
      };
    },
    cancel() {
      console.log("close");
      clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
