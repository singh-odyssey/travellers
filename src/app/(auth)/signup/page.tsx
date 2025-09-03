import SignUpForm from "@/components/sign-up-form";

export default function SignUpPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="mt-2 text-slate-600">Join Wayfindr and connect with verified travellers.</p>
      <div className="mt-8">
        <SignUpForm />
      </div>
    </main>
  );
}
