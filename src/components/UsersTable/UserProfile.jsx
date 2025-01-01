import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUser } from "../../features/user/userSlice";
import { FaUser, FaCamera } from "react-icons/fa6";
import { FaEdit, FaSave } from "react-icons/fa";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    numeroTelephone: "",
  });

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        nom: userInfo.nom,
        prenom: userInfo.prenom,
        email: userInfo.email,
        numeroTelephone: userInfo.numeroTelephone,
      });
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    dispatch(updateUser({ userData: formData })).then(() => {
      dispatch(getUserInfo());
    });
  };

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="bg-blue-50 text-white p-2 rounded-lg shadow-lg w-[90%] flex">
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center mr-8 mt-3 relative group">
          <div className="bg-[#f29a2e] border-4 border-[#011187eb] w-40 h-40 rounded-full flex justify-center items-center relative">
            <FaUser className="text-[#011187eb] text-[100px]" />
            {/* Hover Icon */}
            <div className="absolute  bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity w-40 h-40 rounded-full">
              <label className="cursor-pointer flex flex-col items-center">
                <FaCamera className="text-white text-[24px]" />
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div className="mt-4 text-center w-full flex justify-center gap-2">
            <div className="text-[20px] text-black font-bold">
              {userInfo.nom}
            </div>
            <div className="text-[20px] text-black font-bold">
              {userInfo.prenom}
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="flex-1 grid grid-cols-3 gap-6 items-center text-[18px] text-black">
          {isEditing ? (
            <>
              <div>
                <strong className="text-[#0014a9eb] font-bold">Nom:</strong>{" "}
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="border rounded p-1 w-full"
                />
              </div>
              <div>
                <strong className="text-[#011187eb]">Prénom:</strong>{" "}
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="border rounded p-1 w-full"
                />
              </div>
              <div>
                <strong className="text-[#011187eb]">Email:</strong>{" "}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border rounded p-1 w-full"
                />
              </div>
              <div>
                <strong className="text-[#011187eb]">Téléphone:</strong>{" "}
                <input
                  type="text"
                  name="numeroTelephone"
                  value={formData.numeroTelephone}
                  onChange={handleInputChange}
                  className="border rounded p-1 w-full"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <strong className="text-[#0014a9eb] font-bold">Nom:</strong>{" "}
                {userInfo.nom}
              </div>
              <div>
                <strong className="text-[#011187eb]">Prénom:</strong>{" "}
                {userInfo.prenom}
              </div>
              <div>
                <strong className="text-[#011187eb]">Email:</strong>{" "}
                {userInfo.email}
              </div>
              <div>
                <strong className="text-[#011187eb]">Téléphone:</strong>{" "}
                {userInfo.numeroTelephone}
              </div>
            </>
          )}
          <div>
            <strong className="text-[#011187eb]">Genre:</strong> homme
          </div>
          <div>
            <strong className="text-[#011187eb]">Date de naissance:</strong>{" "}
            30/09/2002
          </div>
          <div className="col-span-2">
            <strong className="text-[#011187eb]">Type d'utilisateur:</strong>{" "}
            {userInfo.typeUtilisateurFinal}
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => {
                if (isEditing) {
                  handleSave(); // Appeler la fonction pour sauvegarder les modifications
                } else {
                  setIsEditing(true); // Activer le mode d'édition
                }
              }}
              className="bg-[#011187eb] text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 w-[70%] justify-center"
            >
              {isEditing ? (
                <>
                  <FaSave /> Sauvegarder
                </>
              ) : (
                <>
                  <FaEdit /> Modifier
                </>
              )}
            </button>
          </div>
        </div>

        {/* Edit Button */}
      </div>
    </div>
  );
};

export default UserProfile;
