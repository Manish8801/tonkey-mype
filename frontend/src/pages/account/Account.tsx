import { Line } from "rc-progress";
import useAuthStore from "../../zustand/useAuthStore";

const Account = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex-1 flex flex-col gap-10 font-roboto py-8">
      <div className="p-4 flex bg-sub-alt-color  rounded-lg space-x-4">
        <div className=" w-[25%] flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt={user?.username}
              className="size-20 rounded-full"
            />
            <div className="space-y-2">
              <h1 className="text-content-primary text-4xl truncate max-w-48">
                {user?.username}
              </h1>
              <p className="text-content-secondary text-xs">
                Joined{" "}
                {user?.createdAt &&
                  new Date(user.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
              </p>
            </div>
          </div>
          <div className="flex  justify-between items-center ">
            <p className="text-content-primary">6</p>

            <Line
              className="rounded-full w-52"
              percent={60}
              strokeWidth={6}
              trailWidth={6}
              trailColor="#424242"
              strokeColor="#e2b714"
            />

            <p className="text-xs text-content-secondary">172/345</p>
          </div>
        </div>
        <div className="flex-1 bg-base-primary rounded-full"></div>
        <div className="w-[69%] flex justify-between">
          <div className="flex justify-center items-center flex-col">
            <p className="text-sm text-content-secondary">tests started</p>
            <h2 className="text-content-primary text-center text-3xl">
              {user?.testsStarted}
            </h2>
          </div>
          <div className="flex justify-center items-center flex-col">
            <p className="text-sm text-content-secondary">tests completed</p>
            <h2 className="text-content-primary text-center text-3xl">
              {user?.testsCompleted}
            </h2>
          </div>

          <div className="flex justify-center items-center flex-col">
            <p className="text-sm text-content-secondary">time typing</p>
            <h2 className="text-content-primary text-center text-3xl">
              {user?.timeTyping} mins
            </h2>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Account;
