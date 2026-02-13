#!/usr/bin/env bun
import { getGitLog } from './git';
import { analyzeCommits } from './analyzer';
import { awards } from './awards';

async function main() {
    const args = process.argv.slice(2);

    if (args.includes('--help') || args.includes('-h')) {
        console.log('Usage: git-valentine [path]');
        console.log('');
        console.log('Analyze a git repository and show contributor statistics.');
        console.log('');
        console.log('Arguments:');
        console.log('  path    Path to git repository (default: current directory)');
        console.log('');
        console.log('Options:');
        console.log('  -h, --help    Show this help message');
        return;
    }

    const repoPath = args[0] || '.';

    try {
        const commits = await getGitLog(repoPath);

        if (commits.length === 0) {
            console.log("No commits found in this repository.");
            return;
        }

        const stats = analyzeCommits(commits);
        const uniqueAuthors = stats.size;

        console.log(`💌 This repository has been loved by ${uniqueAuthors} human${uniqueAuthors !== 1 ? 's' : ''} over ${commits.length.toLocaleString()} commit${commits.length !== 1 ? 's' : ''}.`);
        console.log();

        for (const award of awards) {
            const result = award.check(stats, commits.length);
            if (result) {
                console.log(result);
            }
        }
    } catch (e) {
        console.error("An error occurred during verification:", e);
        process.exit(1);
    }
}

main();
