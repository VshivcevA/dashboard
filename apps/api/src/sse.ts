export function sse(
  interval: number,
  getData: () => Promise<any>,
  editData?: (data: any) => any,
) {
  console.log("start ReadableStream");
  let timeout: NodeJS.Timeout;
  const stream = new ReadableStream({
    start(controller) {
      timeout = setInterval(async () => {
        let data = await getData();
        if (editData) {
          data = editData(data);
        }
        const sseMessage = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(sseMessage));
      }, interval);

      return () => {
        console.log("close ReadableStream");
        clearInterval(timeout);
        controller.enqueue(new TextEncoder().encode("event: close\n\n"));
        controller.close();
      };
    },
    cancel() {
      console.log("close ReadableStream");
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
