Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000))
    return this
}

Date.prototype.addMonth = function(m) {
    let day = this.getDate()
    this.setMonth(this.getMonth() + m)
    if (this.getDate() !== day) this.setDate(0)
    return this;
}