import SidebarList from "./List";
import NewButton from "./NewButton";

const Sidebar = () => {
  return (
    <aside className="w-sidebar fixed top-0 left-0 bottom-0 bg-blue-950 overflow-auto z-[49]">
      <div className="flex flex-col gap-4 text-white p-3">
        <SidebarList />
        <NewButton />
      </div>
    </aside>
  );
};

export default Sidebar;
