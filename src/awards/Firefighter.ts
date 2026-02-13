import type { Award } from './types';

export const Firefighter: Award = {
    name: "Firefighter",
    description: "Most urgent fix commits",
    check(stats, _totalCommits) {
        let maxFixes = 0;
        let firefighter = "";
        for (const [author, data] of stats) {
            if (data.fixCommits > maxFixes) {
                maxFixes = data.fixCommits;
                firefighter = author;
            }
        }
        if (maxFixes > 0) {
            return `🚒 Firefighter award: ${firefighter} (most "fix", "hotfix", "urgent" commits)`;
        }
        return null;
    }
};
