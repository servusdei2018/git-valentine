import type { Award } from './types';

export const PatientGardener: Award = {
    name: "Patient Gardener",
    description: "Largest changes with fewest commits",
    check(stats, _totalCommits) {
        let maxLinesPerCommit = 0;
        let patientGardener = "";
        for (const [author, data] of stats) {
            if (data.commits > 0) {
                const linesPerCommit = (data.totalInsertions + data.totalDeletions) / data.commits;
                if (linesPerCommit > maxLinesPerCommit && linesPerCommit > 100) {
                    maxLinesPerCommit = linesPerCommit;
                    patientGardener = author;
                }
            }
        }
        if (patientGardener) {
            return `🐢 Patient gardener: ${patientGardener} (largest PRs, least commits)`;
        }
        return null;
    }
};
