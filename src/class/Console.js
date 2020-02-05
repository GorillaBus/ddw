class Console {
  constructor(settings) {
    this.x = settings.x;
    this.y = settings.y;
    this.fieldNameSize = settings.fieldNameSize || 50;
    this.rowHeight = settings.rowHeight || 30;
    this.margin = settings.margin || 15;
    this.backgroundColor = "rgba(0, 255, 0, 0.03)";
    this.font = settings.font || "16px Arial";
    this.nameColor = "rgba(15, 255, 0, 0.85)";
    this.valueColor = "rgba(255, 255, 255, 0.85)";
    this.data = settings.data || {};

    this.width = settings.width;
    this.height = settings.height || Object.keys(this.data).length * (this.rowHeight + 2) + this.margin * 2;
  }

  updateData(data) {
    Object.keys(data).forEach((key, i) => {
      this.data[key] = data[key];
    });
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    ctx.fillStyle = this.backgroundColor;
    ctx.fill();

    Object.keys(this.data).forEach((key, i) => {
      const y = this.y + (this.margin * 2) + (i * this.rowHeight);
      const nameX = this.x + this.margin;
      const valueX = this.x + this.margin + this.fieldNameSize;

      this.printText(ctx, nameX, y, key + ": ", this.nameColor);
      this.printText(ctx, valueX, y, this.data[key], this.valueColor);
    });
  }

  printText(ctx, x, y, text, color, font) {
    ctx.font = font || this.font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }
}

export default Console;