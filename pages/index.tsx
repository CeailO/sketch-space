"use client";
import Head from "next/head";
import { Inter } from "@next/font/google";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { useDraw } from "@/hooks/useDraw";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [color, setColor] = useState<string>("#000");

  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <main className="w-screen h-screen bg-white flex gap-10 justify-center items-center">
        <canvas
          onMouseDown={onMouseDown}
          ref={canvasRef}
          width={750}
          height={750}
          className="border border-zink rounded-3xl shadow-lg"
        />
        <div className="grid gap-y-3">
          <HexColorPicker
            className="shadow-lg"
            color={color}
            onChange={(e) => setColor(e)}
          />
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </main>
    </>
  );
}
