function tile(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.revealed = false;
}

tile.prototype.show = function() {
    rect(this.x, this.y, this.w, this.w)
    stroke(0)
    fill(255)
}