export const generateRandomGradient = () => {
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const color1 = getRandomColor();
    const color2 = getRandomColor();
    return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};