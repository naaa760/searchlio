import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen">
      <div className="grid gap-2">
        <div
          id="back-div"
          className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-2 "
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-8 2xl:p-8 lg:p-8 md:p-10 sm:p-2 m-2">
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}
