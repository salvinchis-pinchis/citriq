import test from "node:test";
import assert from "node:assert/strict";
import { logoFrame } from "./hero-motion.mjs";

const source = { x: 980, y: 260, width: 300 };
const target = { x: 100, y: 20, width: 28 };

test("the logo starts at the hero and docks exactly at the header", () => {
  const start = logoFrame(source, target, 800, 0);
  assert.deepEqual(start, { x: 980, y: 260, width: 300, progress: 0 });
  const end = logoFrame(source, target, 800, 800);
  assert.deepEqual(end, { x: 100, y: 20, width: 28, progress: 1 });
});

test("scrolling backward restores the same frame and excessive scroll stays docked", () => {
  const halfway = logoFrame(source, target, 800, 240);
  assert.ok(halfway.progress > 0 && halfway.progress < 1);
  assert.ok(halfway.width > 28 && halfway.width < 300);
  logoFrame(source, target, 800, 700);
  assert.deepEqual(logoFrame(source, target, 800, 240), halfway);
  assert.deepEqual(logoFrame(source, target, 800, 10000), logoFrame(source, target, 800, 800));
});

test("negative scroll keeps the hero state and small viewports have a finite journey", () => {
  assert.equal(logoFrame(source, target, 800, -30).progress, 0);
  const frame = logoFrame(source, target, 100, 80);
  assert.ok(Number.isFinite(frame.x) && Number.isFinite(frame.y));
  assert.ok(frame.progress > 0 && frame.progress < 1);
});

test("on the way up the logo never overshoots the header", () => {
  for (let y = 0; y <= 900; y += 10) {
    assert.ok(logoFrame(source, target, 800, y).y >= target.y, `scroll ${y}`);
  }
});
