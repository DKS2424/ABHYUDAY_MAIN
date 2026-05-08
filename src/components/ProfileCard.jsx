import { useNavigate } from "react-router-dom";

export function ProfileCard() {

  const navigate = useNavigate();

  return (
    <div
      className="
        card
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2

        lg:relative
        lg:left-auto
        lg:top-auto
        lg:translate-x-0
        lg:translate-y-0

        flex
        justify-center
        items-center
      "
      onClick={() => navigate("/event")}
    >
      <div className="w-96 bg-white rounded-2xl overflow-hidden shadow-xl">

        <div className="h-[450px] overflow-hidden">
          <img
            src="https://docs.material-tailwind.com/img/team-3.jpg"
            alt="profile"
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div className="text-center py-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Natalie Paisley
          </h2>

          <p className="text-gray-500 mt-2">
            CEO / Co-Founder
          </p>
        </div>

      </div>
    </div>
  );
}