import Transition from "./Transition"
import Me from "../images/me.png"

const Home = () => {
  return (
    <Transition>
      <div className="row home">
        <div className="col-md-4 text">

          <h1 style={{ color: "whitesmoke" }}>Santeri Smolander</h1>
          <p style={{ color: "whitesmoke" }}>I'm a developer</p>
        </div>
        <div className="col-md-5 m-auto">
        <picture className="">
          <img src={Me} class="rounded img-fluid" alt="img"></img>
        </picture>

        </div>
      </div>
    </Transition>
  )
}

export default Home