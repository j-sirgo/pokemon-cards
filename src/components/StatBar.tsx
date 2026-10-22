import { MAX_STAT } from "../game";

type Props = { label: string; value: number; kind: "hp" | "attack" };

// a labelled horizontal bar scaled to the dataset's largest stat
export function StatBar({ label, value, kind }: Props) {
  const width = `${(value / MAX_STAT) * 100}%`;
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <div className="stat-track">
        <div className={`stat-fill ${kind}`} style={{ width }} />
      </div>
      <span className="stat-value">{value}</span>
    </div>
  );
}
