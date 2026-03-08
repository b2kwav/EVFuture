interface ProgressProps {
  current: number;
  total: number;
  label?: string;
}

export default function Progress({ current, total, label }: ProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-semibold text-secondary">{label}</p>}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-xs text-gray-500 text-right">
        {current} of {total}
      </p>
    </div>
  );
}