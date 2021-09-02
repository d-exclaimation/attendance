//
//  duration.ts
//  web
//
//  Created by d-exclaimation on 16:06.
//

type TimeUnits = {
  ms?: number;
  s?: number;
  min?: number;
  h?: number;
  d?: number;
  m?: number;
  y?: number;
};

export const ms = (units: TimeUnits) => {
  const { ms, s, min, h, d, m, y } = defaultUnits(units);
  return (
    ms * 1 +
    s * 1000 +
    min * 60 * 1000 +
    h * 60 * 60 * 1000 +
    d * 24 * 60 * 60 * 1000 +
    m * 30 * 24 * 60 * 60 * 1000 +
    y * 12 * 30 * 24 * 60 * 60 * 1000
  );
};

export const sec = (units: TimeUnits) => {
  const { ms, s, min, h, d, m, y } = defaultUnits(units);
  return (
    ms / 1000 +
    s * 1 +
    min * 60 +
    h * 60 * 60 +
    d * 24 * 60 * 60 +
    m * 30 * 24 * 60 * 60 +
    y * 12 * 30 * 24 * 60 * 60
  );
};

export const min = (units: TimeUnits) => {
  const { ms, s, min, h, d, m, y } = defaultUnits(units);
  return (
    ms / 1000 / 60 +
    s / 60 +
    min +
    h * 60 +
    d * 24 * 60 +
    m * 30 * 24 * 60 +
    y * 12 * 30 * 24 * 60
  );
};

export const h = (units: TimeUnits) => {
  const { ms, s, min, h, d, m, y } = defaultUnits(units);
  return (
    ms / 1000 / 60 / 60 +
    s / 60 / 60 +
    min / 60 +
    h +
    d * 24 +
    m * 30 * 24 +
    y * 12 * 30 * 24
  );
};

export const d = (units: TimeUnits) => {
  const { ms, s, min, h, d, m, y } = defaultUnits(units);
  return (
    ms / 1000 / 60 / 60 / 24 +
    s / 60 / 60 / 24 +
    min / 60 / 24 +
    h / 24 +
    d +
    m * 30 +
    y * 12 * 30
  );
};

export const m = (units: TimeUnits) => {
  const { ms, s, min, h, d, m, y } = defaultUnits(units);
  return (
    ms / 1000 / 60 / 60 / 24 / 30 +
    s / 60 / 60 / 24 / 30 +
    min / 60 / 24 / 30 +
    h / 24 / 30 +
    d / 30 +
    m +
    y * 12
  );
};

export const y = (units: TimeUnits) => {
  const { ms, s, min, h, d, m, y } = defaultUnits(units);
  return (
    ms / 1000 / 60 / 60 / 24 / 30 / 12 +
    s / 60 / 60 / 24 / 30 / 12 +
    min / 60 / 24 / 30 / 12 +
    h / 24 / 30 / 12 +
    d / 30 / 12 +
    m / 12 +
    y
  );
};

function defaultUnits({ ms, s, min, h, d, m, y }: TimeUnits) {
  return {
    ms: ms ?? 0,
    s: s ?? 0,
    min: min ?? 0,
    h: h ?? 0,
    d: d ?? 0,
    m: m ?? 0,
    y: y ?? 0,
  };
}
