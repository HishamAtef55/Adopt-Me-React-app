import { useState, useContext } from "react";
import useBreedList from "../src/hooks/useBreedsList";
import Result from "../src/components/Result";
import usePetsSearch from "../src/hooks/usePetsSearch";
import ErrorBoundary from "../src/components/ErrorBoundary";
import AdoptPetContext from "../context/AdoptPetContext";

const ANIMALS = ["reptile", "cat", "dog", "bird", "rabbit"];
const SearchParams = () => {
  const [SearchParams, setSearchParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const breedsQuery = useBreedList(SearchParams.animal);
  const breeds = breedsQuery?.data?.breeds ?? [];

  const [adoptedPet] = useContext(AdoptPetContext);

  const petsQuery = usePetsSearch(SearchParams);
  const pets = petsQuery?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const animal = formData.get("animal");
          const location = formData.get("location");
          const breed = formData.get("breed");
          setSearchParams({ animal, location, breed });
        }}
      >
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">location</label>
        <input id="location" placeholder="location" name="location" />
        <label htmlFor="animal">animal</label>
        <select
          id="animal"
          name="animal"
          onChange={(e) => {
            setSearchParams({
              ...SearchParams,
              animal: e.target.value,
              breed: "",
            });
          }}
        >
          <option />
          {ANIMALS.map((animal) => (
            <option value={animal} key={animal}>
              {animal}
            </option>
          ))}
        </select>
        <label htmlFor="breed">Breed</label>
        <select id="breed" name="breed" disabled={!breeds.length}>
          <option />
          {breeds.map((breed) => (
            <option value={breed} key={breed}>
              {breed}
            </option>
          ))}
        </select>

        <button>submit</button>
      </form>
      <ErrorBoundary>
        <Result pets={pets} />
      </ErrorBoundary>
    </div>
  );
};

export default SearchParams;
