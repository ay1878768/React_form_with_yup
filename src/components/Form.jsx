import React, { useState } from "react";
import * as Yup from "yup";
const Form = () => {
    const [error,setError]=useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        gender: "",
        interest: [],
        DOB: "",
    });
    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is Required"),
        lastName: Yup.string().required("Last Name is Required"),
        email: Yup.string()
          .required("Email is Required")
          .email("Invalid email format"),
        phoneNumber: Yup.string()
          .matches(/^\d{10}$/, "Phone Number must be 10 digits")
          .required(),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one symbol"
          )
          .matches(/[0-9]/, "Password must contain at least one number")
          .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
          .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Confirm password is required"),
        gender: Yup.string().required("Gender is required"),
        interest: Yup.array()
          .min(1, "Select at least one interest")
          .required("Select at least one interest"),
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await validationSchema.validate(formData, { abortEarly: false });
          const response = await fetch("https://sheetdb.io/api/v1/w0j9hs64xtbt0", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: formData }),
          });
    
          if (response.ok) {
            console.log("Form Submitted Successfully:", formData);
            alert("Form submitted successfully!");
          } else {
            console.error("Form Submission Failed");
            alert("Failed to submit form.");
          }
        } catch (error) {
          const newErrors = {};
          error.inner.forEach((err) => {
            newErrors[err.path] = err.message;
          });
          setError(newErrors);
        }
    };
    
    const handleChange = (e) => {
        let {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }
    const handleCheckboxChange = (e) => {
        const {name,checked}=e.target;
        let updateInterset=[...formData.interest];
        if(checked) {
            updateInterset.push(name);
        }
        else {
            updateInterset=updateInterset.filter((i)=>(i!==name));
        }

        setFormData({
            ...formData,
            interest:updateInterset,
        })
    }
    return (
        <div className="flex justify-center bg-slate-200 overflow-hidden">
            <form
                method="post"
                action="https://sheetdb.io/api/v1/w0j9hs64xtbt0"
                className="flex flex-col items-left gap-3"
                onSubmit={handleSubmit}
            >
                <h1 className="md:text-3xl text-xl font-semibold mx-auto whitespace-nowrap">Registration Form</h1>
                <div className="flex flex-col gap-1 text-lg font-semibold">
                    <label>First Name:</label>
                    <input
                        className="border-2 md:w-96 m p-2 rounded-lg"
                        type="text"
                        name="firstName"
                        placeholder="enter First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {error.firstName && <span className="text-red-500">{error.firstName}</span>}
                </div>
                <div className="flex flex-col gap-1 text-lg font-semibold">
                    <label>last Name:</label>
                    <input
                        className="border-2 md:w-96 m p-2 rounded-lg"
                        type="text"
                        name="lastName"
                        placeholder="enter Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {error.lastName && <span className="text-red-500">{error.lastName}</span>}
                </div>
                <div className="flex flex-col gap-1 text-lg font-semibold">
                    <label>Email:</label>
                    <input
                        className="border-2 md:w-96 m p-2 rounded-lg"
                        type="email"
                        name="email"
                        placeholder="enter Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {error.email && <span className="text-red-500">{error.email}</span>}
                </div>
                <div className="flex flex-col gap-1 text-lg font-semibold">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        className="border-2 md:w-96 m p-2 rounded-lg"
                        name="phoneNumber"
                        placeholder="enter Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    {error.phoneNumber && <span className="text-red-500">{error.phoneNumber}</span>}
                </div>
                <div className="flex flex-col gap-1 text-lg font-semibold">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="border-2 md:w-96 m p-2 rounded-lg"
                        name="password"
                        placeholder="enter password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {error.password && <span className="text-red-500">{error.password}</span>}
                </div>
                <div className="flex flex-col gap-1 text-lg font-semibold">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        className="border-2 md:w-96 m p-2 rounded-lg"
                        name="confirmPassword"
                        placeholder="enter confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {error.confirmPassword && <span className="text-red-500">{error.confirmPassword}</span>}
                </div>
                <div className="flex flex-col gap-1 text-lg font-semibold">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        className="border-2 md:w-96 m p-2 rounded-lg"
                        name="DOB"
                        placeholder="type DOB"
                        value={formData.DOB}
                        onChange={handleChange}
                    />
                    {error.DOB && <div className="text-red-500">{error.DOB}</div>}
                </div>
                <div className="flex flex-col gap-1 text-lg font-semibold">
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        className="border-2 md:w-96 m p-2 rounded-lg"
                        onChange={handleChange}
                        
                    >
                        <option>select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    {error.gender && <span className="text-red-500">{error.gender}</span>}
                </div>
                <div className="md:flex md:gap-10 text-lg font-semibold">
                    <label>Interest:</label>
                    <div className="md:flex md:flex-row flex flex-col items-center md:gap-8 gap-2">
                        <label>
                            <input
                                type="checkbox"
                                name="coding"
                                checked={formData.interest.includes("coding")}
                                onChange={handleCheckboxChange}
                            />
                            Coding
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="music"
                                checked={formData.interest.includes("music")}
                                onChange={handleCheckboxChange}
                            />
                            Music
                        </label>
                        <label>
                            <input
                                onChange={handleCheckboxChange}
                                type="checkbox"
                                name="cricket"
                                checked={formData.interest.includes("cricket")}
                                
                            />
                            Cricket
                        </label>
                       
                    </div>
                    
                </div>
                {error.interest && <span className="text-red-500 text-lg font-semibold">{error.interest}</span>}
                <button
                    className="bg-orange-400 px-3 py-1 rounded-lg font-bold my-2 w-28"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    )
};
export default Form;
