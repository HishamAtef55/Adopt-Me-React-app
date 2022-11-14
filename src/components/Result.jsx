import Pet from "./Pet";
const Result = ({ pets }) => {
  //throw new Error("I crashed");
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            key={pet.id}
            id={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}-${pet.state}`}
          />
        ))
      )}
    </div>
  );
};

export default Result;
