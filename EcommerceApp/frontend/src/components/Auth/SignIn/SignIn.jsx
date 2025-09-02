import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ingreso exitoso");
  };

  return (
    <>
      <Breadcrumb title="Sign In" pages={["Sign In"]} />
      <section className="overflow-hidden py-20 bg-gray-200">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Inicia sesión en tu cuenta
              </h2>
              <p>Escribi tus detalles</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5">
                  Correo
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  aria-required="true"
                  className="rounded-lg border border-gray-300 bg-gray-100 placeholder:text-gray-500 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="on"
                  required
                  aria-required="true"
                  className="rounded-lg border border-gray-300 bg-gray-100 placeholder:text-gray-500 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
              >
                Iniciar sesión
              </button>

              <p className="text-center mt-6">
                No tenes una cuenta?
                <Link
                  href="/signup"
                  className="text-dark ease-out duration-200 hover:text-blue pl-2"
                >
                  Registrate ahora!
                </Link>
              </p>

              <div className="flex flex-col gap-4.5 mt-6">
                <button className="flex justify-center items-center gap-3.5 rounded-lg border border-gray-300 bg-gray-100 p-3 ease-out duration-200 hover:bg-gray-200">
                  {/* Google SVG */}
                  Inicia sesion con Google
                </button>

                <button className="flex justify-center items-center gap-3.5 rounded-lg border border-gray-300 bg-gray-100 p-3 ease-out duration-200 hover:bg-gray-200">
                  {/* GitHub SVG */}
                  Inicia sesion con GitHub
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
