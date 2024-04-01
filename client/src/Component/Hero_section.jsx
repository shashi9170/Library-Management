const HeroSection = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 p-2 shadow-lg">

      <div className="p-2">
        <img className="" src={process.env.PUBLIC_URL + "../image/library.png"}/>
      </div>

      <div className="p-2">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro rerum
          velit blanditiis dolore voluptatem quo sunt quam enim, vel, quasi
          impedit odit odio nesciunt modi consequuntur? Vel dolorem velit a
          officia explicabo fuga tempore corporis quo asperiores amet. Ut esse
          cupiditate delectus numquam quis harum rerum animi, quasi voluptates
          quibusdam odit at incidunt officiis temporibus, architecto non cumque
          voluptas, a earum perspiciatis veritatis. Ad ea nam maxime, itaque
          animi iure repudiandae accusantium unde ut, amet ipsam! Cumque,
          aliquid consequuntur. Placeat itaque ut maiores fuga, quibusdam
          maxime, accusantium necessitatibus rem fugit commodi consequuntur
          numquam mollitia voluptas laborum, debitis assumenda reiciendis
          impedit.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;



