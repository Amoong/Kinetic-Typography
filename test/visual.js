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

    const dx = item.x - this.mouse.x;
    const dy = item.y - this.mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const minDist = item.radius + this.mouse.radius;

    if (dist < minDist) {
      const angle = Math.atan2(dy, dx);
      console.log(dx, dy, angle);
      const tx = item.x - Math.cos(angle) * minDist;
      const ty = item.y - Math.sin(angle) * minDist;

      const ax = this.mouse.x - tx;
      const ay = this.mouse.y - ty;

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
