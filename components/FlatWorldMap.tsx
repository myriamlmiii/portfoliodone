"use client";

import type { KeyboardEvent } from "react";
import { LOCATIONS } from "@/lib/geo";
import { usePreferences } from "./Preferences";

type Point = readonly [number, number];

const CONTINENTS: Point[][] = [
  [
    [-168, 70], [-153, 72], [-142, 68], [-135, 59], [-128, 54], [-125, 48],
    [-123, 42], [-117, 33], [-108, 29], [-105, 24], [-97, 19], [-91, 16],
    [-86, 12], [-82, 8], [-78, 9], [-77, 15], [-82, 22], [-80, 26],
    [-81, 31], [-78, 35], [-74, 40], [-67, 45], [-60, 49], [-59, 54],
    [-65, 59], [-75, 62], [-83, 66], [-97, 70], [-113, 73], [-130, 72],
    [-146, 74], [-160, 72],
  ],
  [
    [-74, 12], [-68, 10], [-62, 8], [-56, 5], [-51, 0], [-48, -8],
    [-50, -15], [-54, -21], [-58, -29], [-63, -37], [-67, -45], [-72, -54],
    [-76, -48], [-78, -39], [-80, -29], [-80, -19], [-79, -9], [-77, 1],
  ],
  [
    [-12, 36], [-10, 44], [-5, 49], [2, 51], [4, 55], [14, 55],
    [20, 59], [27, 61], [31, 68], [42, 70], [53, 73], [67, 76],
    [82, 74], [95, 72], [108, 71], [122, 68], [135, 60], [147, 57],
    [158, 60], [169, 64], [179, 62], [176, 53], [165, 48], [154, 44],
    [146, 40], [140, 36], [132, 34], [126, 31], [121, 25], [115, 21],
    [109, 18], [106, 12], [101, 8], [104, 3], [111, 0], [119, -4],
    [127, -4], [132, -7], [137, -7], [143, -10], [149, -15], [151, -21],
    [147, -25], [141, -24], [137, -19], [131, -16], [125, -17], [119, -21],
    [115, -26], [111, -22], [107, -15], [105, -8], [101, -4], [97, 3],
    [91, 7], [86, 11], [80, 8], [76, 10], [72, 17], [67, 22],
    [59, 25], [52, 27], [47, 30], [42, 34], [36, 37], [31, 40],
    [25, 40], [19, 38], [13, 37], [8, 37], [2, 40], [-4, 40],
  ],
  [
    [-17, 36], [-6, 35], [5, 37], [13, 35], [21, 32], [28, 31],
    [33, 28], [35, 21], [40, 12], [43, 3], [50, -12], [46, -18],
    [41, -24], [35, -29], [29, -34], [21, -35], [16, -31], [13, -24],
    [10, -16], [6, -9], [1, -3], [-3, 5], [-8, 5], [-12, 13],
    [-16, 20], [-17, 28],
  ],
  [
    [112, -11], [119, -9], [127, -10], [135, -13], [143, -17],
    [151, -23], [153, -29], [149, -36], [143, -39], [135, -35],
    [128, -33], [121, -28], [115, -21],
  ],
  [
    [-53, 60], [-46, 61], [-40, 66], [-38, 72], [-43, 77],
    [-51, 82], [-59, 80], [-63, 74], [-61, 67],
  ],
];

const MAP_OFFSETS: Record<string, Point> = {
  elJadida: [-24, 24],
  ifrane: [23, -28],
  lisbon: [-35, -20],
  vancouver: [-20, -14],
  abbotsford: [21, 15],
};

function project([longitude, latitude]: Point) {
  return {
    x: 42 + ((longitude + 180) / 360) * 516,
    y: 140 + ((84 - latitude) / 140) * 320,
  };
}

function continentPath(points: Point[]) {
  return `${points
    .map((point, index) => {
      const { x, y } = project(point);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ")} Z`;
}

function onMarkerKeyDown(event: KeyboardEvent<SVGGElement>, onSelect: () => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onSelect();
  }
}

export function FlatWorldMap({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const { t } = usePreferences();
  const home = LOCATIONS.find((location) => location.home);
  const homePoint = home ? project([home.lng, home.lat]) : null;

  return (
    <div className="atlas-frame" dir="ltr">
      <svg
        className="atlas-map"
        viewBox="0 0 600 600"
        role="group"
        aria-label={t.places.intro}
      >
        <defs>
          <clipPath id="atlas-circle-clip">
            <circle cx="300" cy="300" r="274" />
          </clipPath>
        </defs>
        <g clipPath="url(#atlas-circle-clip)">
          <g className="atlas-graticule" aria-hidden="true">
            {[-30, 0, 30, 60].map((latitude) => {
              const { y } = project([0, latitude]);
              return <path key={`latitude-${latitude}`} d={`M42 ${y} H558`} />;
            })}
            {[-120, -60, 0, 60, 120].map((longitude) => {
              const { x } = project([longitude, 0]);
              return <path key={`longitude-${longitude}`} d={`M${x} 140 V460`} />;
            })}
          </g>

          <g className="atlas-land" aria-hidden="true">
            {CONTINENTS.map((continent, index) => (
              <path key={index} d={continentPath(continent)} />
            ))}
          </g>

          {homePoint && (
            <g className="atlas-routes" aria-hidden="true">
              {LOCATIONS.filter((location) => !location.home).map((location) => {
                const destination = project([location.lng, location.lat]);
                const middleX = (homePoint.x + destination.x) / 2;
                const middleY = (homePoint.y + destination.y) / 2 - 18;
                return (
                  <path
                    key={`route-${location.id}`}
                    d={`M${homePoint.x},${homePoint.y} Q${middleX},${middleY} ${destination.x},${destination.y}`}
                    className={activeId === location.id ? "is-active" : ""}
                  />
                );
              })}
            </g>
          )}

          {LOCATIONS.map((location) => {
            const actual = project([location.lng, location.lat]);
            const [offsetX, offsetY] = MAP_OFFSETS[location.id] ?? [0, 0];
            const x = actual.x + offsetX;
            const y = actual.y + offsetY;
            const selected = activeId === location.id;
            const label = t.places.items[location.id]?.name ?? location.id;
            return (
              <g
                key={location.id}
                className={`atlas-marker${selected ? " is-active" : ""}${location.home ? " is-home" : ""}`}
                transform={`translate(${x} ${y})`}
                role="button"
                tabIndex={0}
                aria-label={label}
                aria-pressed={selected}
                onClick={() => onSelect(location.id)}
                onKeyDown={(event) => onMarkerKeyDown(event, () => onSelect(location.id))}
              >
                {offsetX !== 0 || offsetY !== 0 ? (
                  <path d={`M${-offsetX},${-offsetY} L0,0`} className="atlas-leader" aria-hidden="true" />
                ) : null}
                <circle r={selected ? 11 : 8} className="atlas-marker-halo" aria-hidden="true" />
                <circle r={location.home ? 4 : 3} className="atlas-marker-core" aria-hidden="true" />
                {selected && (
                  <text x="15" y="-12" className="atlas-label" aria-hidden="true">{label}</text>
                )}
              </g>
            );
          })}
        </g>
        <circle className="atlas-globe-edge" cx="300" cy="300" r="274" />
      </svg>
    </div>
  );
}
