import Transition from "./Transition"

const Home = () => {
  return (
    <Transition>
        <div className="home">
          <div className="text">

          <h1>Santeri Smolander</h1>
          <p>I'm a developer</p>

          </div>
          <div className="image">
          <img src={require("../images/me.png")} alt="me"></img>
          </div>
        </div>
    </Transition>
  )
}

export default Home