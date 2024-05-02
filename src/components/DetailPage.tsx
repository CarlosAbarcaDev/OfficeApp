import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useOfficeStore from "../store/useOfficeAPI";
import { FcBusinesswoman } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { characterDetails, loadCharacterDetails, loading, error } =
    useOfficeStore();
  useEffect(() => {
    if (id) {
      loadCharacterDetails(id);
    }
  }, [id, loadCharacterDetails]);
  console.log(characterDetails);
  const GenderIcon =
    characterDetails?.gender === "Male" ? FcBusinessman : FcBusinesswoman;
  if (loading)
    return (
      <p className="text-5xl text-violet-900 h-screen flex justify-center mt-40 font-bold">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-5xl text-violet-900 h-screen flex justify-center mt-40 font-bold">
        Error: {error}
      </p>
    );
  return (
    <div>
      <div className="flex h-screen items-start justify-center bg-gray-900 p-5">
        <div className="items-center gap-10 md:px-10">
          <div className="flex justify-center">
            <GenderIcon size={300} />
          </div>
          <div>
            <h1 className="mb-2 text-5xl font-bold text-white">
              <span className="text-green-500 mr-4">Character:</span>{" "}
              {characterDetails?.name}
            </h1>
            <h1 className="mb-2 text-5xl font-bold text-white">
              <span className="text-green-500 mr-4">Actor:</span>{" "}
              {characterDetails?.actor}
            </h1>
            <ul className="mb-6 text-white">
              <li className="font-bold mt-4 mb-2">
                Jobs:{" "}
                <span className="font-normal">
                  {" "}
                  {characterDetails?.job.join(", ")}{" "}
                </span>
              </li>
              <li className="font-bold my-2">
                Workplaces:{" "}
                <span className="font-normal">
                  {characterDetails?.workplace.join(", ")}
                </span>
              </li>
              <li className="font-bold my-2">
                Marital Status:{" "}
                <span className="font-normal">
                  {characterDetails?.marital
                    ? `${characterDetails?.marital}`
                    : " No"}
                </span>
              </li>
              <li className="font-bold my-2">
                First Appearance:{" "}
                <span className="font-normal">
                  {characterDetails?.firstAppearance}
                </span>
              </li>
              <li className="font-bold my-2">
                Last Appearance:{" "}
                <span className="font-normal">
                  {characterDetails?.lastAppearance}
                </span>
              </li>
            </ul>
            <div className="flex justify-start space-x-5">
              <Link to={"/"} className="flex w-full">
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500 p-5 py-3 font-semibold">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
