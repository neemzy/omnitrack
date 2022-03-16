import { useState } from "react";
import LimitBreak from "./LimitBreak";

const CriterionType = {
  INITIAL: "initial",
  USE: "use",
  KILL: "kill",
  FINAL: "final"
};

export default function Character({ name, portrait, limitBreaks }) {
  const [killCount, setKillCount] = useState(0);
  const incrementKillCount = () => setKillCount(count => count + 1);
  const decrementKillCount = () => setKillCount(count => Math.max(count - 1, 0));

  const [useCounts, setUseCounts] = useState(limitBreaks.map(limitBreak => 0));

  const incrementUseCount = index => setUseCounts(useCounts => {
    const useCountsCopy = [...useCounts];
    useCountsCopy[index]++;
    return useCountsCopy;
  });

  const decrementUseCount = index => setUseCounts(useCounts => {
    const useCountsCopy = [...useCounts];
    useCountsCopy[index] = Math.max(useCountsCopy[index] - 1, 0);
    return useCountsCopy;
  });

  const criteriaMatches = limitBreaks.map(({ criterion }) => {
    switch (criterion.type) {
      case CriterionType.INITIAL:
        return { available: true };

      case CriterionType.USE: {
        const remainingUseCount = criterion.count - useCounts[limitBreaks.findIndex(({ name }) => name === criterion.name)];

        return {
          available: remainingUseCount <= 0,
          remainingUseName: criterion.name,
          remainingUseCount
        };
      }

      case CriterionType.KILL: {
        const remainingKillCount = criterion.count - killCount;

        return {
          available: remainingKillCount <= 0,
          remainingKillCount
        };
      }

      default:
        return undefined;
    }
  });

  // Set criteria matches for final limits based on other limits
  const allNonFinalLimitsAreAvailable = criteriaMatches.every(criterionMatch => !criterionMatch || criterionMatch.available === true);

  limitBreaks.forEach((limitBreak, index) => {
    if (limitBreak.criterion.type === CriterionType.FINAL) {
      criteriaMatches[index] = { available: allNonFinalLimitsAreAvailable };
    }
  });

  return (
    <div className="basis-60 shrink-0 flex flex-col items-center p-2 border border-slate-400 rounded">
      <div className="flex items-center text-3xl">
        <div
          style={{ backgroundImage: `url("${portrait}")` }}
          className="mr-2 w-10 h-10 rounded-full bg-contain bg-right bg-no-repeat border border-slate-300"
        />
        {name}
      </div>
      <div className="w-full mt-4 mb-3 flex flex-col items-center">
        <div>💀 Kills: {killCount}</div>
        <div className="mt-2 flex flex-row-reverse space-x-1 space-x-reverse">
          <button className="block w-8 h-8 bg-slate-300 border border-slate-400 rounded" onClick={incrementKillCount}>+</button>
          <button className="block w-8 h-8 bg-slate-300 border border-slate-400 rounded" onClick={decrementKillCount}>-</button>
        </div>
      </div>
      {limitBreaks.map(({ name, criterion }, index) => (
        <LimitBreak
          key={name}
          name={name}
          useCount={useCounts[index]}
          incrementUseCount={() => incrementUseCount(index)}
          decrementUseCount={() => decrementUseCount(index)}
          {...criteriaMatches[index]}
        />
      ))}
    </div>
  );
}
