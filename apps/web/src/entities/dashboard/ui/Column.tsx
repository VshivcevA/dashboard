import styles from "./Column.module.scss";
import prettyBytes from "pretty-bytes";

export function Column({
  value,
  maxValue,
  isBites,
}: {
  value: number;
  maxValue: number;
  isBites?: boolean;
}) {
  return (
    <div>
      <div
        className={styles.column__container}
        style={{
          height: 100,
        }}
      >
        <div
          className={styles.column}
          style={{
            height: 100 - (value / maxValue) * 100,
          }}
        ></div>
      </div>
      <p>
        {isBites
          ? prettyBytes(value, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })
          : value}
      </p>
    </div>
  );
}
