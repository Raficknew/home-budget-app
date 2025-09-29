import Image from "next/image";

export function HozzyLogo() {
  return (
    <Image
      className="fixed top-8 sm:left-8"
      src="/images/HozzyLogo.svg"
      alt="logo"
      width={90}
      height={90}
    />
  );
}
