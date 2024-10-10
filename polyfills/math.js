Math.fixed = function(num, decimal) {
    const factor = Math.pow(10, decimal);
    return Math.round(num * factor) / factor;
};