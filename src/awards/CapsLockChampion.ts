import type { Award } from './types';

export const CapsLockChampion: Award = {
    name: "CAPS LOCK CHAMPION",
    description: "Most ALL CAPS commits",
    check(stats, _totalCommits) {
        let maxCapsCommits = 0;
        let capsChamp = "";
        for (const [author, data] of stats) {
            if (data.capsCommits > maxCapsCommits) {
                maxCapsCommits = data.capsCommits;
                capsChamp = author;
            }
        }
        if (capsChamp && maxCapsCommits > 0) {
            return `📢 CAPS LOCK CHAMPION: ${capsChamp} (most ALL CAPS commits, we hear you loud and clear!)`;
        }
        return null;
    }
};
