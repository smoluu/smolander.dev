import Transition from "./Transition"
import { Link } from "react-router-dom";
import Placeholder from "../images/128x128_placeholder.png"

const Projects = () => {
  return (
    <Transition>
      <div className="container-fluid">

        <h1>Projects</h1>
        <div className="row m-5">

          <div className="col-md-3 pt-3">
            <div className="card">
              <img src={Placeholder} className="card-img-top p-1" alt="" />
              <div className="card-body">
                <h5 className="card-title">1st project</h5>
                <p className="card-text">This is the first project</p>
                <Link to="/"><button className="btn btn-dark"> Look</button></Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 pt-3">
            <div className="card">
              <img src={Placeholder} className="card-img-top p-1" alt="" />
              <div className="card-body">
                <h5 className="card-title">1st project</h5>
                <p className="card-text">This is the first project</p>
                <Link to="/"><button className="btn btn-dark"> Look</button></Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 pt-3">
            <div className="card">
              <img src={Placeholder} className="card-img-top p-1" alt="" />
              <div className="card-body">
                <h5 className="card-title">1st project</h5>
                <p className="card-text">This is the first project</p>
                <Link to="/"><button className="btn btn-dark"> Look</button></Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 pt-3">
            <div className="card">
              <img src={Placeholder} className="card-img-top p-1" alt="" />
              <div className="card-body">
                <h5 className="card-title">1st project</h5>
                <p className="card-text">This is the first project</p>
                <Link to="/"><button className="btn btn-dark"> Look</button></Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 pt-3">
            <div className="card">
              <img src={Placeholder} className="card-img-top p-1" alt="" />
              <div className="card-body">
                <h5 className="card-title">1st project</h5>
                <p className="card-text">This is the first project</p>
                <Link to="/"><button className="btn btn-dark"> Look</button></Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 pt-3">
            <div className="card">
              <img src={Placeholder} className="card-img-top p-1" alt="" />
              <div className="card-body">
                <h5 className="card-title">1st project</h5>
                <p className="card-text">This is the first project</p>
                <Link to="/"><button className="btn btn-dark"> Look</button></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">

        </div>


      </div>
    </Transition>
  )
}

export default Projects