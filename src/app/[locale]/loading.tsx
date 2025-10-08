import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Image
        className="animate-bounce"
        src="/images/HozzyPurpleAvatar.svg"
        alt="HozzyAvatar"
        height={100}
        width={100}
      />
    </div>
  );
}
