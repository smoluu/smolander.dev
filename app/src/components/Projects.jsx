import Transition from "./Transition"
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Carousel, Card, Button } from 'react-bootstrap';
import "../css/projects.css"
import SpaceInvadersPreview from "../images/spaceinvaders/preview_spaceinvaders.png";

const Projects = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Transition>

      <div className="container-fluid">
        {/* projects row */}
        <div className="row mx-5">

          <h1 style={{ color: "whitesmoke" }}>Projects</h1>
          <div className="col-md-3">
            <Card data-bs-theme="dark">
              <Card.Img src="https://via.placeholder.com/128x128" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="secondary">Select</Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-3">
            <Card data-bs-theme="dark">
              <Card.Img src="https://via.placeholder.com/128x128" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="secondary">Select</Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-3">
            <Card data-bs-theme="dark">
              <Card.Img src="https://via.placeholder.com/128x128" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="secondary">Select</Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-3">
            <Card data-bs-theme="dark">
              <Card.Img src="https://via.placeholder.com/128x128" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="secondary">Select</Button>
              </Card.Body>
            </Card>
          </div>

        </div>{/* /projects row */}


        {/* games row */}
        <div className="row mx-5">
          <h1 style={{ color: "whitesmoke" }}>Games</h1>

          <Carousel
            indicators={false}
            slide
            data-bs-theme="dark"
          >
            {/* Slide 1 */}
            <Carousel.Item>
              <Card className="custom-card">
                <Card.Img variant="top" src={SpaceInvadersPreview} />
                <Card.Body>
                  <Card.Title>Space Invaders</Card.Title>
                  <Card.Text>
                    Space Invaders is a classic arcade game where players control a spaceship, defending Earth against descending waves of alien invaders by shooting them down while avoiding their retaliatory fire.
                  </Card.Text>
                  <Link to="/Projects/SpaceInvaders" className="btn btn-secondary px-5 mx-3" >
                    Demo
                  </Link>
                  <Link to="" className="btn btn-secondary px-5 mx-3">
                    More info
                  </Link>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* Slide 2 */}
            <Carousel.Item>
              <Card className="custom-card">
                <Card.Img variant="top" src="https://via.placeholder.com/800x400" />
                <Card.Body>
                  <Card.Title>Placeholder</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint quidem, dolorum voluptatum beatae sequi repudiandae ipsa nam, est adipisci, ea expedita impedit exercitationem pariatur corporis atque facere ex mollitia ipsam.
                  </Card.Text>
                  <Link to="" className="btn btn-secondary px-5 mx-3">
                    Demo
                  </Link>
                  <Link to="" className="btn btn-secondary px-5 mx-3">
                    More info
                  </Link>
                </Card.Body>
              </Card>
            </Carousel.Item>

          </Carousel> {/* /caroucel */}


        </div> {/* /games row */}

        <Outlet />
      </div>
    </Transition >
  )
}

export default Projects