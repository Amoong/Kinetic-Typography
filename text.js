export class Text {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  setTextRange(str, density, stageWidth, stageHeight) {
    // Canvas에 폰트를 그려준다.
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const myText = str;
    const fontWidth = 700;
    const fontSize = 200;
    const fontName = "Hind";

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
    this.ctx.textBaseline = `middle`;

    const fontPos = this.ctx.measureText(myText);
    this.ctx.fillText(
      myText,
      (stageWidth - fontPos.width) / 2,
      fontPos.actualBoundingBoxAscent +
        fontPos.actualBoundingBoxDescent +
        (stageHeight - fontSize) / 2
    );

    return this.dotPos(density, stageWidth, stageHeight);
  }

  dotPos(density, stageWidth, stageHeight) {
    // Paricles 정보를 받아온다.
    const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;
    const particles = [];
    let pixel;

    for (let imgY = 0; imgY < stageHeight; imgY += density) {
      for (let imgX = 0; imgX < stageWidth; imgX += density) {
        // 폰트가 그려진 영역의 픽셀만 가져온다.
        pixel = imageData[(imgX + imgY * stageWidth) * 4 + 3];
        if (pixel != 0 && imgX < stageWidth && imgY < stageHeight) {
          particles.push({
            x: imgX,
            y: imgY,
          });
        }
      }
    }

    return particles;
  }
}
