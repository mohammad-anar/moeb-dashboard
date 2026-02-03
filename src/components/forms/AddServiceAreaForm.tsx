"use client";

import { useForm } from "react-hook-form";

interface AddServiceAreaFormInputs {
  areaName: string;
  city: string;
}

export function AddServiceAreaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddServiceAreaFormInputs>({
    mode: "onBlur",
  });

  const onSubmit = (data: { areaName: string; city: string }) => {
    console.log(data);
  };

  return (
    <div>
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Service Area</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Area name field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Area name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("areaName", {
                required: "Area name is required",
              })}
              type="text"
              placeholder="Add Area name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            {errors.areaName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.areaName.message}
              </p>
            )}
          </div>

          {/* City field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              {...register("city", {
                required: "City is required",
              })}
              type="text"
              placeholder="Add city"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white font-semibold py-3 px-4 rounded-full hover:bg-gray-900 disabled:bg-gray-400 transition-colors"
          >
            {isSubmitting ? "Adding..." : "Add Service Area"}
          </button>
        </form>
      </div>
    </div>
  );
}
