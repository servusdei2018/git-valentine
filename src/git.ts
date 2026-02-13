import { existsSync } from 'fs';
import type { CommitData } from './types';

function resolveGitPath(): string {
    try {
        const proc = Bun.spawnSync(["which", "git"]);
        if (proc.success) {
            const path = proc.stdout.toString().trim();
            if (path) return path;
        }
    } catch {
        // Fallback to manual search
    }

    const commonPaths = [
        "/opt/homebrew/bin/git",
        "/usr/local/bin/git",
        "/usr/bin/git",
        "/bin/git",
    ];

    if (process.platform === "win32") {
        commonPaths.push(
            "C:\\Program Files\\Git\\cmd\\git.exe",
            "C:\\Program Files\\Git\\bin\\git.exe",
            "C:\\Program Files (x86)\\Git\\cmd\\git.exe",
            "C:\\Program Files (x86)\\Git\\bin\\git.exe"
        );
        if (process.env.LOCALAPPDATA) {
            commonPaths.push(`${process.env.LOCALAPPDATA}\\Programs\\Git\\cmd\\git.exe`);
        }
    }

    for (const path of commonPaths) {
        if (existsSync(path)) {
            try {
                // Verify we can actually execute it
                const test = Bun.spawnSync([path, "--version"]);
                if (test.success) {
                    return path;
                } ``
            } catch {
                // Ignore and try next path
            }
        }
    }

    return "git"; // Final fallback
}

export async function getGitLog(repoPath: string): Promise<CommitData[]> {
    const gitPath = resolveGitPath();
    const proc = Bun.spawn([
        gitPath,
        "log",
        "--all",
        "--numstat",
        "--format=COMMIT_START%n%an%x09%at%x09%s"
    ], {
        cwd: repoPath
    });

    const output = await new Response(proc.stdout).text();
    await proc.exited;

    if (proc.exitCode !== 0) {
        console.error("Error: Not a git repository or git command failed");
        process.exit(1);
    }

    const commits: CommitData[] = [];
    const blocks = output.split("COMMIT_START\n").filter(b => b.trim());

    for (const block of blocks) {
        const lines = block.trim().split("\n");
        if (lines.length === 0) continue;

        const firstLine = lines[0];
        if (!firstLine) continue;

        const parts = firstLine.split("\t");
        const author = parts[0];
        const timestamp = parts[1];
        const message = parts[2];

        if (!author || !timestamp) continue;

        let filesChanged = 0;
        let insertions = 0;
        let deletions = 0;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line) continue;

            const lineParts = line.trim().split("\t");
            if (lineParts.length === 3) {
                const addedStr = lineParts[0];
                const deletedStr = lineParts[1];
                if (addedStr && deletedStr && !isNaN(parseInt(addedStr))) {
                    filesChanged++;
                    insertions += parseInt(addedStr) || 0;
                    deletions += parseInt(deletedStr) || 0;
                }
            }
        }

        commits.push({
            author: author.trim(),
            timestamp: parseInt(timestamp),
            message: message || "",
            filesChanged,
            insertions,
            deletions
        });
    }

    return commits;
}
