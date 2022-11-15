// import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Carsoul from "../src/components/Carsoul";
import Loader from "../src/components/Loader";
import usePet from "../src/hooks/usePet";
import Modal from "../src/components/Modal";
import { useState, useContext } from "react";
import AdoptPetContext from "../context/AdoptPetContext";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate();
  // [AdoptedPet,setAdoptedPet]
  const [, setAdoptedPet] = useContext(AdoptPetContext);
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
          <Carsoul className="h-10 w-10 rounded-full" images={pet.images} />
          <h1 className="text-sm font-medium text-gray-900">{pet.name}</h1>
          <h2>{`${pet.animal}-${pet.state}-${pet.city}-${pet.breed}`}</h2>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Adopt {pet.name}
          </button>
          <p>{pet.description}</p>

          <button onClick={() => Navigate("/")}>Back</button>
          {showModal && (
            <Modal>
              <h2>Would You Like To adopt{pet.name}</h2>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    Navigate("/");
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  No
                </button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;
