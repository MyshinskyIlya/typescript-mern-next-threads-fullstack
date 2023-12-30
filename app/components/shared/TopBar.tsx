import Image from "next/image";
import Link from "next/link";

function TopBar() {
    return (
        <nav className="topbar">
            <Link href={"/"} className="flex items-center gap-4">
                <Image
                    src={"/logo.svg"}
                    alt="Logo Icon"
                    width={20}
                    height={20}
                    priority
                ></Image>
                <p className="text-heading2-bold text-light-1 max-xs:hidden">
                    Threads
                </p>
            </Link>
        </nav>
    );
}

export default TopBar;
