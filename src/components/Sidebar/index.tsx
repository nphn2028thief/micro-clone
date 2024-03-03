import SidebarList from "./List";
import NewButton from "./NewButton";

const Sidebar = () => {
  return (
    <aside className="w-sidebar fixed top-0 left-0 bottom-0 bg-blue-950 overflow-auto z-[999]">
      <div className="flex flex-col gap-4 p-3 text-white">
        <SidebarList />
        <NewButton />
      </div>
    </aside>
  );
};

export default Sidebar;
