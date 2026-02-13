import type { Award } from './types';

export const ChaosGremlin: Award = {
    name: "Chaos Gremlin",
    description: "Most files touched per commit",
    check(stats, _totalCommits) {
        let maxFilesPerCommit = 0;
        let chaosGremlin = "";
        for (const [author, data] of stats) {
            if (data.commits > 0) {
                const filesPerCommit = data.totalFiles / data.commits;
                if (filesPerCommit > maxFilesPerCommit && filesPerCommit > 3) {
                    maxFilesPerCommit = filesPerCommit;
                    chaosGremlin = author;
                }
            }
        }
        if (chaosGremlin) {
            return `💣 Chaos gremlin: ${chaosGremlin} (most files touched per commit)`;
        }
        return null;
    }
};
