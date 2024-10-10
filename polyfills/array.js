Array.prototype.diff = function(arr) { 
    return this.filter(x => !arr.includes(x)); 
}  
Array.prototype.unique = function() {
    return [...new Set(this)];
};