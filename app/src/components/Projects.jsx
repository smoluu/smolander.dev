import Transition from "./Transition";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Carousel, Card, Button } from "react-bootstrap";
import "../css/projects.css";
import spaceInvadersPreview from "../images/spaceinvaders/preview_spaceinvaders.png";
import snakePreview from "../images/snake/preview_snake.png";

const Projects = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Transition>
      <div className="container-fluid">
        {/* projects row */}
        <div className="row mx-4 gy-4">
          <h1 style={{ color: "whitesmoke" }}>Projects</h1>

          <Card className="col-sm-3" data-bs-theme="dark">
            <Card.Img src="https://via.placeholder.com/128x128" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Button variant="secondary">Select</Button>
            </Card.Body>
          </Card>

          <Card className="col-sm-3" data-bs-theme="dark">
            <Card.Img src="https://via.placeholder.com/128x128" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Button variant="secondary">Select</Button>
            </Card.Body>
          </Card>

          <Card className="col-sm-3" data-bs-theme="dark">
            <Card.Img src="https://via.placeholder.com/128x128" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Button variant="secondary">Select</Button>
            </Card.Body>
          </Card>

          <Card className="col-sm-3" data-bs-theme="dark">
            <Card.Img src="https://via.placeholder.com/128x128" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Button variant="secondary">Select</Button>
            </Card.Body>
          </Card>
        </div>
        {/* /projects row */}
        {/* games row */}
        <div className="row p-4">
          <h1 style={{ color: "whitesmoke" }}>Games</h1>
          <Carousel indicators={false} slide data-bs-theme="dark">
            {/* Slide 1 */}
            <Carousel.Item>
              <Card className="custom-card">
                <Card.Img variant="top" src={spaceInvadersPreview} />
                <Card.Body>
                  <Card.Title>Space Invaders</Card.Title>
                  <Card.Text>
                    Space Invaders is a classic arcade game where players control a spaceship,
                    defending Earth against descending waves of alien invaders by shooting them down
                    while avoiding their retaliatory fire.
                  </Card.Text>
                  <Link to="/Projects/SpaceInvaders" className="btn btn-secondary m-1">
                    Demo
                  </Link>
                  <Link to="" className="btn btn-secondary m-1">
                    More info
                  </Link>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* Slide 2 */}
            <Carousel.Item>
              <Card className="custom-card">
                <Card.Img variant="top" src={snakePreview} />
                <Card.Body>
                  <Card.Title>Snake</Card.Title>
                  <Card.Text>
                    Snake is a timeless arcade game where players guide a growing snake to eat
                    food, avoiding collisions with its own body and boundaries. The objective is to
                    score points by skillfully navigating the snake through the grid.
                  </Card.Text>
                  <Link to="/Projects/Snake" className="btn btn-secondary m-1">
                    Demo
                  </Link>
                  <Link to="" className="btn btn-secondary m-1">
                    More info
                  </Link>
                </Card.Body>
              </Card>
            </Carousel.Item>
          </Carousel>{" "}
          {/* /caroucel */}
        </div>{" "}
        {/* /games row */}
        <Outlet />
      </div>
    </Transition>
  );
};

export default Projects;
