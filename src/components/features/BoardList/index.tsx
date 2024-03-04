import { usePathname } from "next/navigation";

import EmptySearch from "@/components/common/EmptySearch";
import EmptyFavorite from "@/components/common/EmptyFavorite";
import EmptyBoard from "@/components/common/EmptyBoard";
import { EPath } from "@/constants/path";

interface IProps {
  orgId: string;
  search?: string;
}

const BoardList = (props: IProps) => {
  const { orgId, search } = props;

  const pathname = usePathname();

  const data = [];
  const isLoading = false;
  const isFetching = false;

  if (!data.length && search && pathname.includes(EPath.FAVORITE)) {
    return <EmptyFavorite />;
  }

  if (!data.length && search) {
    return <EmptySearch />;
  }

  if (!data.length) {
    return <EmptyBoard />;
  }

  return <div>BoardList</div>;
};

export default BoardList;
