// import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Carsoul from "../src/components/Carsoul";
import Loader from "../src/components/Loader";
import usePet from "../src/hooks/usePet";

const Details = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const petQuery = usePet(id);
  let pet = petQuery?.data?.pets[0];
  return (
    <div className="details">
      {petQuery.isLoading && (
        <h2>
          <Loader />
        </h2>
      )}
      {petQuery.isError && <h2>{petQuery.error}</h2>}
      {petQuery.data && (
        <div>
          <Carsoul images={pet.images} />
          <h1>{pet.name}</h1>
          <h2>{`${pet.animal}-${pet.state}-${pet.city}-${pet.breed}`}</h2>
          <button>Adopt {pet.name}</button>
          <p>{pet.description}</p>

          <button onClick={() => Navigate("/")}>Back</button>
        </div>
      )}
    </div>
  );
};

export default Details;
