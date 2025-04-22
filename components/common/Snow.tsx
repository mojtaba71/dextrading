import _ from "lodash";

const SnowAnimation = () => {
  const total = Array.apply(null, Array(400)).map(function () {});

  return (
    <div className="h-[200px] fixed top-0 left-0 overflow-hidden w-full z-0">
      {total.map((item, index) => (
        <div key={index} className="snow">
          &#10052;
        </div>
      ))}
    </div>
  );
};

export default SnowAnimation;
