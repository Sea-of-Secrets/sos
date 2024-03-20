import React, { Fragment, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import useNickname from "~/store/nickname";

interface CreateRoomProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isGuest: boolean;
}

export default function CreateRoom({ setOpen, isGuest }: CreateRoomProps) {
  const router = useRouter();
  const { nickname, setNickname } = useNickname();
  const cancelButtonRef = useRef(null);
  const [inputNicknameInput, setInputNickname] = useState("");
  const [roomLimit, setRoomLimit] = useState("2인");
  const notificationMethods = [
    { id: "2인", title: "2인 (1:1)" },
    { id: "4인", title: "4인 (1:3)" },
  ];

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRoomLimit(event.target.value);
  };

  const handleConfirm = async () => {
    if (isGuest) {
      setNickname(inputNicknameInput);
    }

    const response = await fetch(`http://localhost:8080/room/make`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname: nickname }),
    });

    if (response.ok) {
      console.log(response);
      // router.push(`/${response.data}`);
    }
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      방 만들기
                    </Dialog.Title>
                    <fieldset className="flex items-center justify-start mt-3 gap-5">
                      <span className="text-md font-medium leading-6 text-gray-900">
                        인원 :
                      </span>
                      <div className="m-5 flex justify-center space-x-10 space-y-0">
                        {notificationMethods.map(notificationMethod => (
                          <div
                            key={notificationMethod.id}
                            className="flex items-center"
                          >
                            <input
                              id={notificationMethod.id}
                              name="notification-method"
                              type="radio"
                              defaultChecked={notificationMethod.id === "2인"}
                              value={notificationMethod.id}
                              onChange={handleOptionChange}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor={notificationMethod.id}
                              className="ml-3 block text-md font-medium leading-6 text-gray-900"
                            >
                              {notificationMethod.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                    {isGuest && (
                      <div className="flex items-center mt-3 pb-3 gap-5">
                        <span className="text-md font-medium leading-6 text-gray-900 flex-none">
                          닉네임 :
                        </span>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={inputNicknameInput}
                          onChange={e => setInputNickname(e.target.value)}
                          className="w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                          placeholder="닉네임을 입력하세요."
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => handleConfirm()}
                  >
                    확인
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    취소
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
