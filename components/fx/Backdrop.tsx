"use client";

import { useEffect, useRef } from "react";
import { useSceneMode } from "@/lib/capability";
import { live } from "@/lib/store";

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

// FBM smoke: deep navy base with a soft jade glow. Swirls around the cursor, drifts with scroll.
const FRAG = `#version 300 es
precision mediump float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uScroll;
out vec4 o;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for(int i = 0; i < 5; i++){ v += a*n(p); p = p*2.02 + 7.3; a *= .5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes; vec2 q = uv; q.x *= uRes.x / uRes.y;
  vec2 m = uMouse; m.x *= uRes.x / uRes.y;
  float d = distance(q, m); float swirl = smoothstep(.45, 0., d);
  vec2 dir = normalize(q - m + 1e-4);
  q += vec2(-dir.y, dir.x) * swirl * .22;
  q.y += uScroll * .35;
  float t = uTime * .035;
  float f = fbm(q * 1.6 + vec2(t, -t * .6) + fbm(q * 2.4 - t));
  vec3 navy = vec3(.012, .03, .055);
  vec3 deep = vec3(.0, .12, .15);
  vec3 teal = vec3(.30, .66, .60);
  vec3 col = mix(navy, deep, smoothstep(.25, .75, f));
  col += teal * pow(smoothstep(.55, .95, f), 2.) * .22;
  col += teal * swirl * .10;
  float key = smoothstep(.9, .0, distance(uv, vec2(.78, .62)));
  col += vec3(.02, .22, .24) * key * .5;
  o = vec4(col, 1.);
}`;

/** Full-screen WebGL2 smoke at 0.33x resolution, upscaled by CSS. No-op if WebGL2 is missing or the device is low-power. */
export function Backdrop() {
  const mode = useSceneMode();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (mode !== "full") return;
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl2", { antialias: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uScroll = gl.getUniformLocation(prog, "uScroll");

    const SCALE = 0.33;
    const resize = () => {
      canvas.width = Math.max(2, Math.round(window.innerWidth * SCALE));
      canvas.height = Math.max(2, Math.round(window.innerHeight * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let visible = !document.hidden;
    const onVis = () => (visible = !document.hidden);
    document.addEventListener("visibilitychange", onVis);

    let mx = 0.5;
    let my = 0.5;
    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mx += (live.mouse.x + 0.5 - mx) * 0.05;
      my += (0.5 - live.mouse.y - my) * 0.05;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uScroll, window.scrollY / maxScroll);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [mode]);

  if (mode !== "full") return null;
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="backdrop-canvas pointer-events-none fixed inset-0 -z-10 h-full w-full"
      style={{ imageRendering: "auto" }}
    />
  );
}
