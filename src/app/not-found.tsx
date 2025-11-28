"use client";
import { PackageOpen } from "lucide-react";
import AppEmpty from "../shared/components/AppEmpty";
import { Button } from "../shared/components/ui";
import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathname = usePathname();

  const segment = pathname.split("/").pop();

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <AppEmpty
        title="Not Found"
        description={`The page ${segment} you are looking for does not exist.`}
        icon={<PackageOpen />}
        button={<Button>Go to Home</Button>}
      />
    </div>
  );
};

export default NotFound;
