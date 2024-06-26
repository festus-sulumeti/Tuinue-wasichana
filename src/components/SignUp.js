import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

const SignUp = () => {
    const [loading, setLoading] = useState(false);

    const onSignUp = async (values) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            address: '',
            gender: '',
            role: '',
        },
        validate: values => {
            const errors = {};
            if (values.password !== values.confirm_password) {
                errors.confirm_password = 'Passwords do not match';
            }
            return errors;
        },
        onSubmit: (values) => {
            onSignUp(values);
        },
    });

    return (
        <>
            <ToastContainer />
            <div className="container mx-auto">
                <form className="sign-up max-w-lg mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg" onSubmit={formik.handleSubmit}>
                    <h2 className="text-center text-2xl mb-6">Sign up for Tuinue Wasichana</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
                        <input required type="text" name="name" value={formik.values.name} onChange={formik.handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                        <input required type="email" name="email" value={formik.values.email} onChange={formik.handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input required type="password" name="password" value={formik.values.password} onChange={formik.handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">Confirm Password</label>
                        <input required type="password" name="confirm_password" value={formik.values.confirm_password} onChange={formik.handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        {formik.errors.confirm_password ? <div className="text-red-500">{formik.errors.confirm_password}</div> : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                        <input type="text" name="address" value={formik.values.address} onChange={formik.handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
                        <select required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="gender" value={formik.values.gender} onChange={formik.handleChange}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
                        <select required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="role" value={formik.values.role} onChange={formik.handleChange}>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="donor">Donor</option>
                            <option value="charity">Charity</option>
                        </select>
                    </div>
                    <div className="mb-4 text-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;
