"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import qs from "query-string";
import { Search, XCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EPath } from "@/constants/path";
import useDebounce from "@/hooks/useDebounce";

export const NavbarSearch = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: EPath.DASHBOARD,
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value.startsWith(" ")) {
      setSearchValue(value);
    }
  };

  return (
    <div className="w-full max-w-[520px] relative">
      <Search className="w-4 h-4 absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchValue}
        placeholder="Search boards..."
        className="px-9"
        onChange={handleChange}
      />
      {searchValue ? (
        <Button
          variant="ghost"
          className="h-auto flex absolute top-1/2 right-0.5 transform -translate-y-1/2 p-2 rounded-full"
        >
          <XCircle className="w-3 h-3" />
        </Button>
      ) : null}
    </div>
  );
};
