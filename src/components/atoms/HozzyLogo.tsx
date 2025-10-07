import Image from "next/image";
import Link from "next/link";

export function HozzyLogo({ link = false }: { link?: boolean }) {
  if (link) {
    return (
      <Link className="fixed top-8 sm:left-8" href="/">
        <HozzyImage />
      </Link>
    );
  }

  return <HozzyImage />;
}

function HozzyImage() {
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
