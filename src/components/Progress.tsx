type Props = { round: number; total: number; score: number };

// round counter, running score, and a progress bar
export function Progress({ round, total, score }: Props) {
  return (
    <div className="progress">
      <div className="progress-text">
        <span>
          Card {round} of {total}
        </span>
        <span>
          Score {score} / {total}
        </span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${((round - 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
