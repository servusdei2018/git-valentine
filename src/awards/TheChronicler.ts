import type { Award } from './types';

export const TheChronicler: Award = {
    name: "The Chronicler",
    description: "Longest average commit messages",
    check(stats, _totalCommits) {
        let maxAvgMsgLen = 0;
        let chronicler = "";
        for (const [author, data] of stats) {
            if (data.commits > 0) {
                const avgLen = data.totalMessageLength / data.commits;
                if (avgLen > maxAvgMsgLen) {
                    maxAvgMsgLen = avgLen;
                    chronicler = author;
                }
            }
        }
        if (chronicler && maxAvgMsgLen > 50) {
            return `✍️ The Chronicler: ${chronicler} (longest average commit messages, basically a novelist)`;
        }
        return null;
    }
};
