import { Shader, ChromaFlow, Swirl } from "shaders/react";

export default function ShaderBackground() {
  return (
    <Shader className="h-full w-full">
      <Swirl colorA="#f5ce0a" colorB="#cf6f06" speed={0.8} detail={0.8} blend={50} />
      {/* <ChromaFlow
        baseColor="#2a323f"
        upColor="#f5ce0a"
        downColor="#2a323f"
        leftColor="#fffcf8"
        rightColor="#f5ce0a"
        intensity={0.9}
        radius={1.8}
        momentum={25}
        maskType="alpha"
        opacity={0.97}
      /> */}
    </Shader>
  );
}
