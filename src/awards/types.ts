import type { AuthorStats } from '../types';

export type Award = {
    name: string;
    description: string;
    /**
     * Checks if the award should be given based on the stats.
     * @param stats Map of author stats
     * @param totalCommits Total number of commits in the repo
     * @returns A string describing the award winner, or null if no winner.
     */
    check(stats: Map<string, AuthorStats>, totalCommits: number): string | null;
}
