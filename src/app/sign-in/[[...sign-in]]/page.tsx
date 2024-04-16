import { SignIn } from "@clerk/nextjs";

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const redirectUrl = searchParams.redirectUrl as string;

  return (
    <>

      <div className="flex justify-center py-40">
        <SignIn afterSignInUrl={redirectUrl} />
      </div>
    </>
  );
}