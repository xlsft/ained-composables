



export const polyfills = (): void => {

    Date.prototype.addHours = function(h: number) { this.setTime(this.getTime() + (h*60*60*1000)); return this }
    Date.prototype.addMonth = function(m: number) { const day = this.getDate(); this.setMonth(this.getMonth() + m); if (this.getDate() !== day) this.setDate(0); return this }
    
    Array.prototype.diff = function<T = any>(a: T[]): T[] { return this.filter(x => !a.includes(x)) }  
    Array.prototype.unique = function<T = any>(): T[] { return [...new Set<T>(this)] }
   
    String.prototype.hexEncode = function(): string { let result = ""; for (let i = 0; i < this.length; i++) result += ("000"+this.charCodeAt(i).toString(16)).slice(-4); return result }
    String.prototype.hexDecode = function(): string { let hexes = this.match(/.{1,4}/g) || [], result = ""; for(let i = 0; i < hexes.length; i++) result += String.fromCharCode(parseInt(hexes[i], 16)); return result }
    
    Math.fixed = function(num: number, decimal: number): number { const factor = Math.pow(10, decimal); return Math.round(num * factor) / factor }
    
}