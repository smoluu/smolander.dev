import Transition from "./Transition"
import Me from "../images/me.png"

const Home = () => {
  return (
    <Transition>
      <div className="row home">
        <div className="col-md-4 text">

          <h1>Santeri Smolander</h1>
          <p>I'm a developer</p>
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