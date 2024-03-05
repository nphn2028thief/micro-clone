import { useState } from "react";
import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";

const useApiMutation = <T>(mutationFn: FunctionReference<"mutation">) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const apiMutation = useMutation(mutationFn);

  const mutate = async (payload: T) => {
    setIsPending(true);
    return apiMutation(payload)
      .then((result) => result)
      .catch((error) => {
        throw error;
      })
      .finally(() => setIsPending(false));
  };

  return {
    mutate,
    isPending,
  };
};

export default useApiMutation;
