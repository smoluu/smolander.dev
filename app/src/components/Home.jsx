const Home = () => {
  return (
    <div className="container">
      <div className="home">
        <h1>Santeri Smolander</h1>
        <p>I'm a developer</p>
      </div>
      <div className="image">
        <img src={ require("../images/me.png")}></img>
      </div>
    </div>
  )
}

export default Home