import type { AuthorStats, CommitData } from './types';

export function analyzeCommits(commits: CommitData[]): Map<string, AuthorStats> {
    const stats = new Map<string, AuthorStats>();

    for (const commit of commits) {
        if (!stats.has(commit.author)) {
            stats.set(commit.author, {
                commits: 0,
                nightCommits: 0,
                refactorCommits: 0,
                fixCommits: 0,
                totalFiles: 0,
                totalInsertions: 0,
                totalDeletions: 0,
                totalMessageLength: 0,
                emojiCommits: 0,
                capsCommits: 0
            });
        }

        const authorStats = stats.get(commit.author)!;
        authorStats.commits++;
        authorStats.totalFiles += commit.filesChanged;
        authorStats.totalInsertions += commit.insertions;
        authorStats.totalDeletions += commit.deletions;
        authorStats.totalMessageLength += commit.message.length;

        const hour = new Date(commit.timestamp * 1000).getHours();
        if (hour >= 0 && hour < 5) {
            authorStats.nightCommits++;
        }

        const lowerMessage = commit.message.toLowerCase();
        if (lowerMessage.match(/\b(refactor|cleanup|clean up|reorganize|restructure)\b/)) {
            authorStats.refactorCommits++;
        }
        if (lowerMessage.match(/\b(nit|fix|hotfix|bugfix|urgent|critical)\b/)) {
            authorStats.fixCommits++;
        }

        if (commit.message.match(/\p{Extended_Pictographic}/u)) {
            authorStats.emojiCommits++;
        }
        const lettersOnly = commit.message.replace(/[^a-zA-Z]/g, '');
        if (lettersOnly.length >= 5 && lettersOnly === lettersOnly.toUpperCase()) {
            authorStats.capsCommits++;
        }
    }

    return stats;
}
