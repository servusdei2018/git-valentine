export type CommitData = {
    author: string;
    timestamp: number;
    message: string;
    filesChanged: number;
    insertions: number;
    deletions: number;
}

export type AuthorStats = {
    commits: number;
    nightCommits: number;
    refactorCommits: number;
    fixCommits: number;
    totalFiles: number;
    totalInsertions: number;
    totalDeletions: number;
    totalMessageLength: number;
    emojiCommits: number;
    capsCommits: number;
}
