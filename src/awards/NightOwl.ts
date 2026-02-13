import type { Award } from './types';

export const NightOwl: Award = {
    name: "Night Owl",
    description: "Most commits after midnight",
    check(stats, _totalCommits) {
        let maxNightCommits = 0;
        let nightOwl = "";
        for (const [author, data] of stats) {
            if (data.nightCommits > maxNightCommits) {
                maxNightCommits = data.nightCommits;
                nightOwl = author;
            }
        }
        if (maxNightCommits > 0) {
            return `🌙 Night owl award: ${nightOwl} (most commits after midnight)`;
        }
        return null;
    }
};
