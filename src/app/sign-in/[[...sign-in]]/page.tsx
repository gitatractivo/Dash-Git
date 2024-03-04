import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
    {/* <div className='fixed w-full h-[100%]  top-0 left-0 bg-black bg-opacity-50 z-10'></div> */}
    <div className="flex justify-center py-16">
      <SignIn />
    </div>
    </>
  );
}