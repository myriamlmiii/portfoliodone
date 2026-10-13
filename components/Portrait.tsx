import Image from "next/image";

export function Portrait() {
  return (
    <figure className="portrait-frame">
      <Image
        src="/photos/photoportrait.png"
        alt="Portrait of Meriem Lmoubariki"
        width={900}
        height={1125}
        priority
        quality={90}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 70vw, 88vw"
      />
    </figure>
  );
}
