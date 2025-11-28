import { LogOut } from "lucide-react";
import { Button } from "../ui";

const SidebarFooter = () => {
  return (
    <div className="w-full">
      <Button className="w-full">
        <LogOut />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default SidebarFooter;
