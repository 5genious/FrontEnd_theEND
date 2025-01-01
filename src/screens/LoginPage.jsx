import React, { useEffect, useState } from 'react'
import { FormRow, ImageScreenBlur } from '../components'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import fstsLogo from '../assets/images/fstsLogo.png'
import fstsImage from '../assets/images/fstsImage.jpg'
const initialState = {
  email: '',
  motDePasse: '',
}

const LoginPage = () => {
  const [values, setValues] = useState(initialState)
  const { user, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [user, navigate])
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(`${name}:${value}`)
    setValues({ ...values, [name]: value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    console.log('hello')
    const { email, motDePasse } = values
    if (!email || !motDePasse) {
      toast.error('Svp remplir tout les champs')
      return
    }
    dispatch(loginUser({ email: email, motDePasse: motDePasse }))
  }
  return (
    <>
      <div className="w-full">
        <ImageScreenBlur />
      </div>
      <div className="flex justify-center items-center h-screen ">
        <div className="w-[85%] h-[50vh] bg-[#D6E2EE] rounded-2xl xs:h-[60vh] xs:w-[70%] md:h-[65%] lg:h-[83%] lg:w-[80%] lg:grid lg:grid-cols-2 shadow-md shadow-black">
          {/* imageLogo */}
          <div>
            <div className="flex justify-center items-center w-full">
              <img src={fstsLogo} alt="" className="w-[50%]" />
            </div>
            {/* LoginH1 */}
            <div className="ml-[10%] font-bold text-[23px] lg:text-[26px] text-[#00407D] lg:ml-[15%] md:ml-[10%] lg:mt-9">
              <h1>Login</h1>
            </div>
            {/* dataInputs */}
            <div className="flex justify-center items-center ">
              <form className="w-full lg:w-[80%]" onSubmit={onSubmit}>
                <div className="flex justify-center">
                  <div className="w-full m-7 grid grid-cols-1 gap-7">
                    <div>
                      <FormRow
                        type="text"
                        name="email"
                        value={values.email}
                        handleChange={handleChange}
                        labelText="Email"
                      />
                    </div>
                    <div>
                      <FormRow
                        type="password"
                        name="motDePasse"
                        value={values.motDePasse}
                        handleChange={handleChange}
                        labelText="Password"
                      />
                    </div>
                    <div className="flex items-center w-[100%]">
                      <button
                        type="submit"
                        className="bg-[#00407D] w-screen text-white p-1 lg:p-2 rounded-md lg:text-[18px] hover:tracking-widest hover:shadow-2xl hover:shadow-black transition-all ease-in-out duration-500"
                        disabled={isLoading}
                      >
                        {isLoading ? 'loading...' : 'Login'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {/* Copyright
              <div className="mt-12 lg:mt-28">
                <p className="text-[#00407D] text-[13px] ml-2 text-center ">
                  Copyright BlueBooks 2024
                </p>
              </div> */}
            </div>
          </div>
          <div className="hidden lg:block h-full">
            <img
              src={fstsImage}
              alt=""
              className="h-full rounded-2xl shadow-sm shadow-black"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
