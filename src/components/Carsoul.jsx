import { Component } from "react";

class Carsoul extends Component {
  state = {
    active: 0,
  };

  static defaultprops = {
    images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
  };
  render() {
    const { images } = this.props;
    const { active } = this.state;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              data-index={index}
              alt="animal"
              className={index === active ? "active" : ""}
              onClick={(e) => {
                this.setState({ active: +e.target.dataset.index });
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Carsoul;
