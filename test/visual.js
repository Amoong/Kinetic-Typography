import { Particle } from "./particle.js";

export class Visual {
  constructor() {
    this.texture = PIXI.Texture.from("./particle.png");

    this.mouse = {
      x: 0,
      y: 0,
      radius: 100,
    };

    document.addEventListener("pointermove", this.onMove.bind(this), false);
  }

  show(stage) {
    if (this.container) {
      stage.removeChild(this.container);
    }

    this.container = new PIXI.ParticleContainer(1, {
      vertices: false,
      position: true,
      rotation: false,
      scale: false,
      uvs: false,
      tint: true,
    });

    stage.addChild(this.container);

    this.particle = new Particle({ x: 200, y: 200 }, this.texture);
    this.container.addChild(this.particle.sprite);
  }

  animate() {
    const item = this.particle;
    const dx = this.mouse.x - item.x;
    const dy = this.mouse.y - item.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = item.radius + this.mouse.radius;

    if (dist < minDist) {
      const angle = Math.atan2(dy, dx);
      const tx = item.x + Math.cos(angle) * minDist;
      const ty = item.y + Math.sin(angle) * minDist;
      const ax = this.mouse.x - tx;
      // const ax = tx - this.mouse.x;
      const ay = this.mouse.y - ty;
      // const ay = ty - this.mouse.y;
      // console.log("mouse", this.mouse.x, this.mouse.y);
      // console.log("target", tx, ty);
      // console.log("acc", ax, ay);
      item.vx += ax;
      item.vy += ay;
      item.collide();
    }

    item.draw();
  }

  onMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}
