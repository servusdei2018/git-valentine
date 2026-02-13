import type { Award } from './types';

export const Janitor: Award = {
    name: "Janitor",
    description: "Most refactor commits",
    check(stats, _totalCommits) {
        let maxRefactors = 0;
        let janitor = "";
        for (const [author, data] of stats) {
            if (data.refactorCommits > maxRefactors) {
                maxRefactors = data.refactorCommits;
                janitor = author;
            }
        }
        if (maxRefactors > 0) {
            return `🧹 Janitor award: ${janitor} (most refactors)`;
        }
        return null;
    }
};
