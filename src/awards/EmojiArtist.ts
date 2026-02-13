import type { Award } from './types';

export const EmojiArtist: Award = {
    name: "Emoji Artist",
    description: "Most commits with emojis",
    check(stats, _totalCommits) {
        let maxEmojiCommits = 0;
        let emojiArtist = "";
        for (const [author, data] of stats) {
            if (data.emojiCommits > maxEmojiCommits) {
                maxEmojiCommits = data.emojiCommits;
                emojiArtist = author;
            }
        }
        if (emojiArtist && maxEmojiCommits > 0) {
            return `🎨 The Emoji Artist: ${emojiArtist} (most commits using emojis 🚀✨)`;
        }
        return null;
    }
};
