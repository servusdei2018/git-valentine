import type { Award } from './types';

export const TheMinimalist: Award = {
    name: "The Minimalist",
    description: "Shortest average commit messages",
    check(stats, _totalCommits) {
        let minAvgMsgLen = Infinity;
        let minimalist = "";
        for (const [author, data] of stats) {
            if (data.commits >= 3) {
                const avgLen = data.totalMessageLength / data.commits;
                if (avgLen < minAvgMsgLen) {
                    minAvgMsgLen = avgLen;
                    minimalist = author;
                }
            }
        }
        if (minimalist && minAvgMsgLen < 20) {
            return `🤏 The Minimalist: ${minimalist} (shortest average messages, "fixed" is a whole sentence)`;
        }
        return null;
    }
};
