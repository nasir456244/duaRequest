import React, { useContext, useState } from "react";
import TimeAgo from "timeago-react";
import { ImBin2 } from "react-icons/im";
import { PrayerRequestContext } from "../context/PrayerRequest";
import DeleteModal from "../components/DeleteModal";
import Image from "next/image";


const styles = {
  listContainer: ` tracking-2 hover:shadow-2xl -my-[9px] flex flex-col max-w-[544px] p-[4px] bg-[#ffffff] rounded-2xl break-words overflow-hidden max-w-full h-fit `,
};

const MyPrayers = ({ address, name, createdAt, image, prayer, id, deleteConfirmation }) => {
  const [likes, setLikes] = useState();
  const { user } = useContext(PrayerRequestContext);
  const [deletePrayerID, setDeletePrayerID] = useState("");
  const isPaidAccount = user?.stripeRole !== "free"

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 

  const deletePrayer = (id) => {
    if (!user) return;
    if(!isPaidAccount) return;
    setIsDeleteModalOpen(true);
    setDeletePrayerID(id);
    return;
  };

  return (
    <>
    
      {user && isPaidAccount &&    
          <div className="relative">
            {isDeleteModalOpen && (
              <DeleteModal
                setDeleteDua={(e) => deleteConfirmation(e, id)}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            )}

            <div className={styles.listContainer}>
              <div className="flex h-full w-full justify-center py-4 px-3  overflow-hidden ">
              <div className="rounded-[50%] h-full w-max">
              <Image layout="fixed"  height={42} alt='profile' width={42} className="flex rounded-[50%]" src={image} />
            </div>

                <div className="flex flex-col max-w-[460px] ml-2 ">
                  <div className="flex justify-between items-center ">
                    <p className="font-semibold text-[14px] text-[#000000] not-italic ">
                      {name}
                    </p>
                    <TimeAgo
                      datetime={createdAt}
                      className="font-medium text-xs pr-[4px]"
                    />
                  </div>
                  <p className="font-medium text-[#8C8C8C] pr-[4px] ">{prayer}</p>
                  <div className="flex justify-between w-full p-2">
                    <p className="font-semibold text-[14px] text-[#8C8C8C] relative right-[7px] ">
                      {likes?.length > 0 &&
                        Intl.NumberFormat("en", { notation: "compact" }).format(
                          likes?.length
                        ) + " Prayers"}
                    </p>
                    <div className="flex justify-end ">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => deletePrayer(id)}
                      >
                        <ImBin2 className=" w-[15.75px] h-[18px] text-[#f9072b] " />
                        <p className="font-semibold text-[14px] leading-5 text-[#f9072b] ml-2">
                          Delete
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      };
    </>
  );
};

export default MyPrayers;