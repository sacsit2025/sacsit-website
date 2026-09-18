"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's living still (D30, realized by D91).
 *
 * The four hero scenes stay STILL PLATES - the `<img>` is the page's largest paint and nothing here
 * replaces it. This canvas lies over them and only breathes: a slow, shallow warp that reads like air
 * over a plant floor, about 4 kB of shader, one draw at 30 fps.
 *
 * It refuses to run, silently, when:
 *   - the reader asked for less motion (prefers-reduced-motion),
 *   - the pointer is coarse (a phone: the effect is invisible and the battery is not ours to spend),
 *   - WebGL is absent or the context is lost,
 *   - the hero is off screen (an IntersectionObserver stops the loop).
 * In every one of those cases the hero is exactly the approved mock.
 */
export default function LivingStill() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const VERT = `
      attribute vec2 p;
      varying vec2 uv;
      void main(){ uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }
    `;
    // A shallow moving gradient in the brand's cyan, masked to the lower half of the band where the
    // plate is darkest: it never touches the headline's contrast.
    const FRAG = `
      precision mediump float;
      varying vec2 uv;
      uniform float t;
      uniform vec2 res;

      float wave(vec2 q, float speed, float scale){
        return sin(q.x * scale + t * speed) * cos(q.y * scale * 0.7 - t * speed * 0.6);
      }

      void main(){
        vec2 q = uv;
        q.x *= res.x / max(res.y, 1.0);
        float w = wave(q, 0.25, 6.0) * 0.5 + wave(q, 0.17, 11.0) * 0.5;
        float band = smoothstep(0.85, 0.15, uv.y);        // strongest low in the frame
        float edge = smoothstep(0.0, 0.35, uv.x) * smoothstep(1.0, 0.65, uv.x);
        float a = (0.035 + 0.03 * w) * band * edge;
        vec3 cyan = vec3(0.275, 0.765, 0.933);            // #46C3EE
        gl_FragColor = vec4(cyan * a, a);
      }
    `;

    const compile = (type: number, source: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = vs && fs ? gl.createProgram() : null;
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const uT = gl.getUniformLocation(program, "t");
    const uRes = gl.getUniformLocation(program, "res");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w && h && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let raf = 0;
    let last = 0;
    let visible = true;
    const start = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || now - last < 33) return; // ~30 fps is plenty for something this slow
      last = now;
      resize();
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      canvas.classList.remove("on");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    resize();
    canvas.classList.add("on");
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="living" aria-hidden="true" />;
}
