import { useQuery } from "@tanstack/react-query";

const fetchbreedlist = async ({ queryKey }) => {
  const [, animal] = queryKey;
  if (!animal) return [];
  const res = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  return res.json();
};

const useBreedList = (animal) => {
  return useQuery(["breeds", animal], fetchbreedlist);
};
export default useBreedList;
