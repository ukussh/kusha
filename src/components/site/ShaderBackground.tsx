import { Shader, Swirl } from "shaders/react";

export default function ShaderBackground() {
  // The swirl is a soft gradient, so render it at a third of the size and scale it up:
  // a ninth of the pixels for the GPU to shade each frame, with no visible loss.
  return (
    <div className="absolute left-0 top-0 h-1/3 w-1/3 origin-top-left scale-[3]">
      <Shader className="h-full w-full">
        <Swirl colorA="#f0f0f0" colorB="#e9e9e9" speed={0.8} detail={0.8} blend={50} />
      </Shader>
    </div>
  );
}
