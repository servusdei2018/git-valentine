import type { Award } from './types';

export const MostCommitted: Award = {
    name: "Most Committed",
    description: "Most committed to this codebase",
    check(stats, _totalCommits) {
        let maxCommits = 0;
        let mostCommitted = "";
        for (const [author, data] of stats) {
            if (data.commits > maxCommits) {
                maxCommits = data.commits;
                mostCommitted = author;
            }
        }
        if (mostCommitted) {
            return `🥇 Most committed to this codebase: ${mostCommitted} (${maxCommits} commits)`;
        }
        return null;
    }
};
