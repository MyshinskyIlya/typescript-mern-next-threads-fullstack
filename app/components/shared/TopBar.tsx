import Image from "next/image";
import Link from "next/link";

function TopBar() {
    return (
        <nav className="topbar">
            <Link href={"/"} className="items-center gap-4">
                <Image
                    src={"/logo.svg"}
                    alt="Logo Icon"
                    width={20}
                    height={20}
                ></Image>
            </Link>
        </nav>
    );
}

export default TopBar;
