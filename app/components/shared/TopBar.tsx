import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function TopBar() {
    const isUserLogIn = true;
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

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image
                                    src={"/assets/logout.svg"}
                                    alt="Logout"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>

                <OrganizationSwitcher
                    appearance={{
                        elements: {
                            organizationSwitcherTrigger: "py-4 px-4 text-white",
                        },
                    }}
                />
            </div>
        </nav>
    );
}

export default TopBar;
