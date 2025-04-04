/**
 * Converts the first letter of each word in a string to uppercase,
 * making the rest of the word lowercase.
 * Keeps certain words like "do", "da", "de" in lowercase.
 */
export function toTitleCase(text: string): string {
    const regex = /\S+/g;
    const exceptions = ['do', 'da', 'de', 'e', 'a', 'o', 'à', 'é'];

    return text.replace(regex, (word) => {
        if (exceptions.includes(word.toLowerCase())) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}
