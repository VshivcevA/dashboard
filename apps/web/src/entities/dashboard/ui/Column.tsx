export function Column({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        height: maxValue,
        width: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      <div
        style={{
          background: "#333",
          height: value,
          width: "100%",
          // transition: "0.3 ease-in-out all ease",
          transitionDuration: "0.9s",
        }}
      ></div>
    </div>
  );
}
