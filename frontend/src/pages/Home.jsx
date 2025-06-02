import Login from "../components/Login";
import home_bg from "../assets/home_bg.jpg";

const Home = () => {
  return (
    <div
      className="relative flex justify-center items-center h-screen"
      style={{
        background: `url(${home_bg}) center/cover no-repeat `,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-600/90 to-blue-950/90 "></div>

      <div className="relative z-10">
        <Login />
      </div>
    </div>
  );
};

export default Home;
