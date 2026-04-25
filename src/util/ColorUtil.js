const gradientColors = [
    "#CB3066",
    "#16BFFD",
    "#EF629F",
    "#EECDA3",
    "#FFC837",
    "#FF8008",
    "#12D8FA",
    "#1FA2FF",
];

const hashText = (text) => [...text].reduce((hash, char) => hash + char.charCodeAt(0), 0);

export const generateGradientFromText = (text) => {
    const hash = hashText(text);
    const color1 = gradientColors[hash % gradientColors.length];
    const color2 = gradientColors[(hash + 3) % gradientColors.length];

    return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};
