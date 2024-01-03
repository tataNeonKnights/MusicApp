import React from 'react'

function Signup() {
  return (
    <div className='signup bg-gradient-to-b from-green-100 via-indigo-300 to-purple-500 text-slate-800'>
      <section className="bg-gray-5">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          <span className='text-black'>Spitify-Clone </span>  
      </a>
      <div className="w-full  rounded-lg shadow border-2 border-black border-t-black md:mt-0 sm:max-w-md xl:p-0 bg-opacity-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6 " action="#">
              <div className='flex flex-col items-start justify-center'>
                      <label htmlFor="name" className="block mb-2 text-sm font-bold text-black ">Entert Your Name</label>
                      <input type="text" name="name" id="name" className="bg-white text-black border border-gray-30  sm:text-sm rounded-lg block w-full p-2.5" placeholder="Enter your full Name" required=""/>
                  </div>
                  <div className='flex flex-col items-start justify-center'>
                      <label htmlFor="email" className="block mb-2 text-sm font-bold text-black ">Your email</label>
                      <input type="email" name="email" id="email" className="bg-white text-black border border-gray-30  sm:text-sm rounded-lg block w-full p-2.5" placeholder="Enter your email here" required=""/>
                  </div>
                  <div className='flex flex-col items-start justify-center'>
                      <label htmlFor="password" className="block mb-2 text-sm font-bold text-black">Password</label>
                      <input type="password" name="password" id="password" className="bg-white text-black border border-gray-30  sm:text-sm rounded-lg block w-full p-2.5" placeholder="Enter new password here" required=""/>
                  </div>
                  <div className='flex flex-col items-start justify-center'>
                      <label htmlFor="confirm password" className="block mb-2 text-sm font-bold text-black">Confirm Password</label>
                      <input type="password" name="confirm-password" id="confirm-password" className="bg-white text-black border border-gray-30  sm:text-sm rounded-lg block w-full p-2.5" placeholder="Enter confirm password here" required=""/>
                  </div>
                  <button type="submit" className="w-3/6 text-white bg-green-600  rounded-full px-3 py-2 text-xl hover:-transition ease-in-out hover:-translate-y-1  hover: duration-300 hover:shadow-[0px_0px_10px_0px_rgba(0,0,0)]">Sign Up</button>
                  <p className="text-sm text-gray-900 font-bold">
                      Allready have an Account? <a href="/login" className="font-bold text-blue-700 hover:underline dark:text-primary-500">Sign in</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Signup