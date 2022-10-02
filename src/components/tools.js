function strToObj(str) {
    try {
        return JSON.parse(str);
    } catch (error) {
        return str;
    }
}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomKey(par, integer = 1000) {
    return par + Math.floor(Math.random() * integer);
}
export { strToObj, getRandomColor, randomKey };
