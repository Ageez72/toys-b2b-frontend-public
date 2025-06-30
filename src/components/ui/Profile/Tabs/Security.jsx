import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../../../../context/AppContext';
import en from "../../../../../locales/en.json";
import ar from "../../../../../locales/ar.json";
import { useForm } from 'react-hook-form';

export default function Security() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const { state = {}, dispatch = () => { } } = useAppContext() || {};
  const [translation, setTranslation] = useState(ar);
  useEffect(() => {
    setTranslation(state.LANG === "EN" ? en : ar);
  }, [state.LANG]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    console.log(data); // handle form data
  };

  return (
    <div className='py-3'>
      <h2 className="sub-title mb-6">{translation.security}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Password Field */}
        <div className='form-group'>
          <label className='block mb-2'>
            {translation.newPassword} <span className='required'>*</span>
          </label>
          <div className='relative'>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <i className="icon-shield-security"></i>
            </div>
            <input
              placeholder={translation.newPassword}
              type={showPassword ? 'text' : 'password'}
              className='w-full ps-10 pe-10 p-2.5'
              {...register('password', {
                required: translation.register.errors.password.required,
                minLength: {
                  value: 3,
                  message: translation.register.errors.password.min_length,
                },
              })}
            />
            <div
              className='absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="icon-view-on"></i>
              ) : (
                <i className="icon-view-off"></i>
              )}
            </div>
          </div>
          {errors.password && (
            <span className="error-msg text-red-500">{errors.password.message}</span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className='form-group'>
          <label className='block mb-2'>
            {translation.confirmPassword} <span className='required'>*</span>
          </label>
          <div className='relative'>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <i className="icon-shield-security"></i>
            </div>
            <input
              placeholder={translation.confirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              className='w-full ps-10 pe-10 p-2.5'
              {...register('confirmPassword', {
                required: translation.register.errors.password.required,
                validate: value =>
                  value === passwordValue || translation.register.errors.password.confirm_not_match,
              })}
            />
            <div
              className='absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer'
              onClick={() => setConfirmShowPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <i className="icon-view-on"></i>
              ) : (
                <i className="icon-view-off"></i>
              )}
            </div>
          </div>
          {errors.confirmPassword && (
            <span className="error-msg text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>
        <div className="text-end">
          <button type='submit' className='primary-btn w-auto'>
            {translation.saveChanges}
          </button>
        </div>
      </form>
    </div>
  );
}
