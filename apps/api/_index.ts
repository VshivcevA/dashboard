// import index from "../index.html";
// import index from "../../web/.next/server/app/index.html";

const server = Bun.serve({
  port: 3100,
  routes: {
    // "/": index,
    "/dashboard": {
      async GET(req) {
        // const stream = new ReadableStream({
        //   async start(controller) {
        //     console.log("Stream started");
        //
        //     const timer = setInterval(async () => {
        //       try {
        //         const data = await si.get({
        //           currentLoad: "currentLoad,cpus",
        //         });
        //
        //         const message = `data: ${JSON.stringify(data)}\n\n`;
        //         controller.enqueue(message);
        //       } catch (error) {
        //         console.error("Error getting system info:", error);
        //         controller.enqueue(
        //           `event: error\ndata: ${JSON.stringify({ error: "Failed to get CPU info" })}\n\n`,
        //         );
        //       }
        //     }, 1000);
        //
        //     req.signal.addEventListener("abort", () => {
        //       clearInterval(timer);
        //       controller.close();
        //       console.log("Stream aborted");
        //     });
        //   },
        // });
        //
        // return new Response(stream, {
        //   headers: {
        //     "Content-Type": "text/event-stream",
        //     "Cache-Control": "no-cache",
        //     "Access-Control-Allow-Origin": "*",
        //     Connection: "keep-alive",
        //   },
        // });

        return new Response("Not Found", { status: 404 });
      },
    },
  },

  development: true,
});

console.log(`Server running at http://localhost:${server.port}`);
