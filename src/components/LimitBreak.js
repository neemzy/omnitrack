import classNames from "classnames";

export default function LimitBreak({
  name,
  useCount,
  incrementUseCount,
  decrementUseCount,
  available,
  remainingUseName,
  remainingUseCount,
  remainingKillCount
}) {
  return (
    <div className="relative w-full mt-2 border border-slate-300 rounded">
      <div className={classNames("flex flex-col items-center pt-2 pb-3", { "opacity-50": !available })}>
        <div className="text-xl">
          {name}
        </div>
        <div className="mt-1">Uses: {useCount}</div>
        <div className="mt-2 flex flex-row-reverse space-x-1 space-x-reverse">
          <button
            className="block w-8 h-8 bg-slate-300 border border-slate-400 rounded"
            onClick={incrementUseCount}
            disabled={!available}
          >+</button>
          <button
            className="block w-8 h-8 bg-slate-300 border border-slate-400 rounded"
            onClick={decrementUseCount}
            disabled={!available}
          >-</button>
        </div>
      </div>
      {remainingKillCount > 0 && (
        <div
          className="absolute top-0 right-1 text-xl cursor-help"
          title={`Remaining kills before unlocking: ${remainingKillCount}`}
        >ℹ️</div>
      )}
      {remainingUseCount > 0 && (
        <div
          className="absolute top-0 right-1 text-xl cursor-help"
          title={`Remaining uses of ${remainingUseName} before unlocking: ${remainingUseCount}`}
        >ℹ️</div>
      )}
    </div>
  );
}
